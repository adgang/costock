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
    debug("add donation body:", req.body)
    // TODO: validations
    const uuid = uuidv4();
    debug("uuid:" + uuid);
    const time = new Date().getTime();
    try {
      const donation = { ...req.body, created_at: time};
      const redres = await redis
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
      debug("redis res:", redres);
      res.json({id: uuid, ...donation});
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  return { addDonation };
}

module.exports = donationController;
