module.exports = (redis) => {
  return {
    ...require("./donations")(redis),
    ...require("./models")(redis),
    ...require("./devices")(redis),
    ...require("./orders")(redis),
  };
};
