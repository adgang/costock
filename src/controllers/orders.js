const {
  DEVICE_PREFIX,
  UNKNOWN_ERROR_RESPONSE,
  DEVICE_BY_LOCATION_INDEX,
  DEVICE_BY_MODEL_PREFIX,
  AVAILABLE_DEVICE_BY_MODEL_PREFIX,
  AVAILABLE_DEVICES_BY_LOCATION_INDEX,
  FEASIBLE_DELIVERY_DISTANCE_KM,
  ORDER_PREFIX,
  ORDERS_BY_LOCATION_INDEX,
  WAITLISTED_ORDERS_BY_LOCATION_INDEX,
  DELETED_ORDER_PREFIX,
} = require("../constants");
const { v4: uuidv4 } = require("uuid");
const { redisKey } = require("../utils");
const { flatten, unflatten } = require("flat");

const debug = require("debug")("controllers:orders");

function orderController(redis) {
  async function getOrderKeys() {
    const keys = await redis.keys(redisKey(ORDER_PREFIX, "*"));

    return keys;
  }

  async function listOrders(req, res, next) {
    try {
      debug("query params: ", req.query);
      const keys = await getOrderKeys();
      debug("keys to fetch:", keys);

      const commands = keys.map((key) => ["hgetall", key]);
      debug("commands prepared:", commands);
      const pipeLineCommand = commands.reduce(
        (pip, cmd) => pip.call(...cmd),
        redis.pipeline()
      );

      const redres = await pipeLineCommand.exec();
      debug("get response:", redres);
      const idList = keys.map((k) => k.slice(ORDER_PREFIX.length + 1));

      const orders = redres.map((r, idx) => {
        return {
          ...unflatten(r[1]),
          id: idList[idx],
          created_at: parseInt(r[1].created_at),
        };
      });

      res.json(orders);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function addOrder(req, res, next) {
    debug("request body:", req.body);
    const uuid = uuidv4();
    const time = new Date().getTime();

    const order = {
      ...req.body,
      created_at: time,
      status: "waitlisted",
    };
    const redisArgsObj = flatten(order);
    const redisArgs = Object.entries(redisArgsObj).flat();

    debug("redis args:", redisArgs);
    try {
      const redres = await redis
        .multi()
        .hset(redisKey(ORDER_PREFIX, uuid), ...redisArgs)
        .geoadd(
          ORDERS_BY_LOCATION_INDEX,
          order.location.long,
          order.location.lat,
          uuid
        )
        .geoadd(
          WAITLISTED_ORDERS_BY_LOCATION_INDEX,
          order.location.long,
          order.location.lat,
          uuid
        )
        .exec();
      // TODO: validate response
    } catch (err) {
      console.log(err);
      throw err;
    }

    order.id = uuid;
    debug("response body:", order);
    res.json(order);
  }

  async function getOrder(req, res, next) {
    debug("request params:", req.params);
    try {
      const redisOrder = await redis.hgetall(
        redisKey(ORDER_PREFIX, req.params.orderId)
      );
      if (redisOrder.status) {
        const order = unflatten(redisOrder);
        order.id = req.params.orderId;
        order.created_at = parseInt(order.created_at);
        res.json(order);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function editOrder(req, res, next) {
    console.log("edit Order not implemented");
  }

  async function deleteOrder(req, res, next) {
    debug("delete order params:", req.params);

    try {
      const redres = redis
        .multi()
        .rename(
          redisKey(ORDER_PREFIX, req.params.orderId),
          redisKey(DELETED_ORDER_PREFIX, req.params.orderId)
        )
        .zrem(ORDERS_BY_LOCATION_INDEX, req.params.orderId)
        .zrem(WAITLISTED_ORDERS_BY_LOCATION_INDEX, req.params.orderId)
        .exec();
      debug("redis response:", redres);
    } catch (err) {
      console.log(err);
      throw err;
    }

    res.end();
  }

  return { listOrders, addOrder, getOrder, editOrder, deleteOrder };
}

module.exports = orderController;
