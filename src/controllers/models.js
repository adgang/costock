const { MODEL_PREFIX } = require("../constants");
const { v4: uuidv4 } = require("uuid");
const { redisKey } = require("../utils");

const debug = require("debug")("controllers:models");

function modelController(redis) {
  function listModels(req, res, next) {
    console.log("list models not implemented");
    res.json([]);
  }

  async function addModel(req, res, next) {
    debug("body: ", JSON.stringify(req.body));
    const uuid = uuidv4();
    debug("uuid:" + uuid);
    const time = new Date().getTime();
    const model = { ...req.body, created_at: time };
    try {
      const res = await redis
        .multi()
        .call(
          "JSON.SET",
          redisKey(MODEL_PREFIX, uuid),
          ".",
          JSON.stringify(model)
        )
        .exec();
    } catch (err) {
      console.log(err);
    }
    res.end();
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
