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
} = require("../constants");
const { v4: uuidv4 } = require("uuid");
const { redisKey } = require("../utils");
const { flatten, unflatten } = require("flat");

const debug = require("debug")("controllers:orders");

function orderController(redis) {
  async function listOrders(req, res, next) {
    console.log("list Orders not implemented");
    res.json([]);
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
        .hmset(redisKey(ORDER_PREFIX, uuid), ...redisArgs)
        .geoadd(
          ORDERS_BY_LOCATION_INDEX,
          order.delivery_location.long,
          order.delivery_location.lat,
          uuid
        )
        .geoadd(
          WAITLISTED_ORDERS_BY_LOCATION_INDEX,
          order.delivery_location.long,
          order.delivery_location.lat,
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
        const order =  unflatten(redisOrder);
        order.id = req.params.orderId;
        order.created_at = parseInt(order.created_at)
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

  return { listOrders, addOrder, getOrder, editOrder };
}

module.exports = orderController;
