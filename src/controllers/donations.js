const { v4: uuidv4 } = require("uuid");
var debug = require('debug')('controllers:donations')
const { redisKey } = require("../utils");
const {
  DONATION_BY_EMAIL_PREFIX,
  DONATION_BY_PHONE_PREFIX,
  DONATION_PREFIX,
} = require("../constants");

function donationController(redis) {
  async function addDonation(req, res, next) {
    // TODO: validations
    const uuid = uuidv4();
    debug("uuid:" + uuid);
    const time = new Date().getTime();
    try {
      const donation = { ...req.body, uuid, created_at: time };
      const res = await redis
        .multi()
        .call(
          "JSON.SET",
          redisKey(DONATION_PREFIX, uuid),
          ".",
          JSON.stringify(donation)
        )
        .zadd(redisKey(DONATION_BY_EMAIL_PREFIX, req.body.email), time, uuid)
        .zadd(redisKey(DONATION_BY_PHONE_PREFIX, req.body.phone), time, uuid)
        .exec();
      debug("redis res:", res);
    } catch (err) {
      console.log(err);
    }
    res.end();
  }
  return { addDonation };
}

module.exports = donationController;