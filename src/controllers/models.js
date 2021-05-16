const { MODEL_PREFIX } = require("../constants");
const { v4: uuidv4 } = require("uuid");
const { redisKey } = require("../utils");

const debug = require("debug")("controllers:models");

function modelController(redis) {
  async function listModels(req, res, next) {
    try {
      const keys = await redis.call("keys", redisKey(MODEL_PREFIX, "*"));
      debug("keys fetched:", keys);
      const commands = keys.map((key) => ["JSON.GET", key]);
      debug("commands prepared:", commands);
      const pipeLineCommand = commands.reduce(
        (pip, cmd) => pip.call(...cmd),
        redis.pipeline()
      );
      const response = await pipeLineCommand.exec();
      const idList = keys.map((k) => k.slice(MODEL_PREFIX.length + 1));
      debug("get all response:", response);
      res.json(
        response.map((r, idx) => {
          return {
            ...JSON.parse(r[1]),
            id: idList[idx],
          };
        })
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 134, message: "Unknown error" });
    }
  }

  async function addModel(req, res, next) {
    // TODO: prevent duplicate addition
    debug("body: ", JSON.stringify(req.body));
    const uuid = uuidv4();
    debug("uuid:" + uuid);
    const time = new Date().getTime();
    const model = { ...req.body, created_at: time };
    try {
      const response = await redis
        .multi()
        .call(
          "JSON.SET",
          redisKey(MODEL_PREFIX, uuid),
          ".",
          JSON.stringify(model)
        )
        .exec();
      res.status(200).json({ ...model, id: uuid });
    } catch (err) {
      console.log(err);
    }
  }

  async function getModel(req, res, next) {
    debug("params: ", JSON.stringify(req.params));
    try {
      const result = await redis
        .multi()
        .call("JSON.GET", redisKey(MODEL_PREFIX, req.params.modelId))
        .exec();
      debug("result:", result[0][1]);
      res.send(JSON.parse(result[0][1]));
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ code: 123, message: "something wrong with server" });
    }
  }

  function editModel(req, res, next) {
    console.log("edit model not implemented");
  }

  return { listModels, addModel, getModel, editModel };
}

module.exports = modelController;
