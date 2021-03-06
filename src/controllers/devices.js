const {
  DEVICE_PREFIX,
  UNKNOWN_ERROR_RESPONSE,
  DEVICE_BY_LOCATION_INDEX,
  DEVICE_BY_MODEL_PREFIX,
  AVAILABLE_DEVICE_BY_MODEL_PREFIX,
  AVAILABLE_DEVICES_BY_LOCATION_INDEX,
  FEASIBLE_DELIVERY_DISTANCE_KM,
} = require("../constants");
const { v4: uuidv4 } = require("uuid");
const { redisKey } = require("../utils");
const { flatten, unflatten } = require("flat");

const debug = require("debug")("controllers:devices");

function deviceController(redis) {
  async function getDeviceKeys(location, modelId, status) {
    // return all keys
    if (!location) {
      const keys = await redis.call("keys", redisKey(DEVICE_PREFIX, "*"));
      return keys;
    } else {
      // TODO: validate location format
      const parts = location.split(",");
      const [long, lat] = parts;
      const keys = await redis.georadius(
        DEVICE_BY_LOCATION_INDEX,
        long,
        lat,
        FEASIBLE_DELIVERY_DISTANCE_KM,
        "km",
        "WITHDIST",
        "ASC"
      );
      debug("location based keys:", keys);
      // TODO: send distance to response somehow
      return keys.map((k) => redisKey(DEVICE_PREFIX, k[0]));
    }
    // TODO: Optimize location, model and status queries with heavier indexing
    return [];
  }
  async function listDevices(req, res, next) {
    debug("request params:", req.query);
    try {
      const keys = await getDeviceKeys(
        req.query.location,
        req.query.model,
        req.query.status
      );
      debug("keys fetched:", keys);
      const commands = keys.map((key) => ["hgetall", key]);
      debug("commands prepared:", commands);
      const pipeLineCommand = commands.reduce(
        (pip, cmd) => pip.call(...cmd),
        redis.pipeline()
      );
      const response = await pipeLineCommand.exec();
      const idList = keys.map((k) => k.slice(DEVICE_PREFIX.length + 1));
      debug("get response:", response);
      const devices = response.map((r, idx) => {
        return {
          ...unflatten(r[1]),
          id: idList[idx],
          created_at: parseInt(r[1].created_at),
          assigned_at: parseInt(r[1].assigned_at),
        };
      });
      // TODO: Remove this after better indexing
      const devices_with_status = !req.query.status
        ? devices
        : devices.filter((d) => d.status == req.query.status);
      const devices_with_model = !req.query.model
        ? devices_with_status
        : devices_with_status.filter((d) => d.model_id == req.query.model);
      res.json(devices_with_model);
    } catch (err) {
      console.log(err);
      res.status(500).json(UNKNOWN_ERROR_RESPONSE);
    }
  }

  async function addDevice(req, res, next) {
    debug("request body:", req.body);
    const uuid = uuidv4();
    const time = new Date().getTime();

    try {
      const device = { ...req.body, id: uuid, created_at: time };
      const redisArgsObj = flatten(device);
      const redisArgs = Object.entries(redisArgsObj).flat();

      // TODO: handle redis errors
      const redisRes = await redis
        .multi()
        .hset(redisKey(DEVICE_PREFIX, uuid), ...redisArgs)
        .geoadd(
          DEVICE_BY_LOCATION_INDEX,
          req.body.location.long,
          req.body.location.lat,
          uuid
        )
        .sadd(redisKey(DEVICE_BY_MODEL_PREFIX, device.model_id), uuid)
        .exec();
      res.status(200).json(device);
    } catch (err) {
      console.log(err);
      res.status(500).json(UNKNOWN_ERROR_RESPONSE);
    }
  }

  async function getDevice(req, res, next) {
    debug("device id:", req.params.deviceId);
    try {
      const device = await redis.hgetall(
        redisKey(DEVICE_PREFIX, req.params.deviceId)
      );
      debug("redis response:", device);
      if (device.model_id) {
        const device_with_id = {
          ...unflatten(device),
          id: req.params.deviceId,
        };
        res.status(200).json(device_with_id);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(UNKNOWN_ERROR_RESPONSE);
    }
  }

  async function editDevice(req, res, next) {
    try {
      debug("edit device params:", req.params);
      debug("edit device body:", req.body);
      const device = req.body;
      if (Object.keys(device).length > 0) {
        const cmds = [];
        const args = Object.entries(flatten(device)).flat();
        // TODO: disallow changing of model
        cmds.push([
          "hset",
          redisKey(DEVICE_PREFIX, req.params.deviceId),
          ...args,
        ]);
        if (device.location) {
          cmds.push([
            "geoadd",
            DEVICE_BY_LOCATION_INDEX,
            device.location.long,
            device.location.lat,
            req.params.deviceId,
          ]);
        }
        cmds.push(["hgetall", redisKey(DEVICE_PREFIX, req.params.deviceId)]);
        const redCommand = cmds.reduce(
          (redCmd, c) => redCmd.call(...c),
          redis.multi()
        );
        const redres = await redCommand.exec();
        debug("redis response:", redres);
        const newDevice = unflatten(redres[redres.length - 1][1]);
        newDevice.id = req.params.deviceId;
        newDevice.created_at = parseInt(newDevice.created_at);
        debug("edited device:", newDevice);
        res.json(newDevice);
      } else {
        res.status(400).end();
      }
    } catch (err) {
      console.log("error in edit order:", err);
      throw err;
    }
  }

  return { listDevices, addDevice, getDevice, editDevice };
}

module.exports = deviceController;
