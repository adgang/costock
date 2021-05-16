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
      id: uuid,
      created_at: time,
      status: "waitlisted",
    };
    debug("response body:", order);
    res.json(order);
  }

  async function getOrder(req, res, next) {
    debug("request params:", req.params);
  }

  async function editOrder(req, res, next) {
    console.log("edit Order not implemented");
  }

  return { listOrders, addOrder, getOrder, editOrder };
}

module.exports = orderController;
