const donations = require("./donations");
const models = require("./models");
const devices = require("./devices");
const orders = require("./orders");

module.exports = {
  ...donations,
  ...models,
  ...devices,
  ...orders,
};
