const {
  DEVICE_PREFIX,
  UNKNOWN_ERROR_RESPONSE,
  DEVICE_BY_LOCATION_INDEX,
  DEVICE_BY_MODEL_PREFIX,
} = require("../constants");
const { v4: uuidv4 } = require("uuid");
const { redisKey } = require("../utils");

const debug = require("debug")("controllers:devices");

function deviceController(redis) {
  async function listDevices(req, res, next) {
    debug("request params:", req.params);
    try {
      const keys = await redis.call("keys", redisKey(DEVICE_PREFIX, "*"));
      debug("keys fetched:", keys);
      const commands = keys.map((key) => ["hgetall", key]);
      debug("commands prepared:", commands);
      const pipeLineCommand = commands.reduce(
        (pip, cmd) => pip.call(...cmd),
        redis.pipeline()
      );
      const response = await pipeLineCommand.exec();
      const idList = keys.map((k) => k.slice(DEVICE_PREFIX.length + 1));
      debug("get all response:", response);
      const devices = response.map((r, idx) => {
        return {
          ...r[1],
          id: idList[idx],
        };
      });
      res.json(devices);
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
          "lat",
          req.body.location.lat,
          "long",
          req.body.location.long,
          "created_at",
          time
        )
        .geoadd(
          DEVICE_BY_LOCATION_INDEX,
          req.body.location.lat,
          req.body.location.long,
          uuid
        )
        .sadd(redisKey(DEVICE_BY_MODEL_PREFIX, req.body.model_id), uuid)
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
