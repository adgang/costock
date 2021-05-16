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

const debug = require("debug")("controllers:devices");

function deviceController(redis) {
  async function getDeviceKeys(location, modelId, status) {
    // return all keys
    if (!location && !modelId && !status) {
      const keys = await redis.call("keys", redisKey(DEVICE_PREFIX, "*"));
      return keys;
    }
    // TODO: validate location format
    if (location) {
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
      return keys.map(k => redisKey(DEVICE_PREFIX, k[0]));
    }
    // TODO: Optimize location, model and status queries with heavier indexing
    return [];
  }
  async function listDevices(req, res, next) {
    debug("request params:", req.query);
    try {
      const keys = await getDeviceKeys(req.query.location, req.query.modelId, req.query.status);
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
          ...r[1],
          id: idList[idx],
        };
      });
      // TODO: Remove this after better indexing
      const devices_with_status = !req.query.status ? devices : devices.filter(d => d.status == req.query.status)
      res.json(devices_with_status);
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
      // TODO: handle redis errors
      const response = await redis
        .multi()
        .hmset(
          redisKey(DEVICE_PREFIX, uuid),
          "model_id",
          req.body.model_id,
          "model_name",
          req.body.model_name,
          "status",
          req.body.status,
          "long",
          req.body.location.long,
          "lat",
          req.body.location.lat,
          "created_at",
          time
        )
        .geoadd(
          DEVICE_BY_LOCATION_INDEX,
          req.body.location.lat,
          req.body.location.long,
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
        const device_with_id = { ...device, id: req.params.deviceId };
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
    console.log("edit Device not implemented");
  }

  return { listDevices, addDevice, getDevice, editDevice };
}

module.exports = deviceController;
