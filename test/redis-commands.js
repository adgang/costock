const { Redis } = require("../src/redis");
const { describe, it, after, before } = require("mocha");
const redis = Redis.default_redis = new Redis();

describe("while testing redis commands", () => {

  describe("#jsonCommands", () => {
    it("saves json", async () => {
      const res = await redis.call("JSON.SET", "blah1", ".", '{"a":2}');
      console.log(res);
    });

    it("gets json", async () => {
      const res = await redis.call("JSON.GET", "blah1");
      console.log(res);
    });
  });

  after(() => {
    redis.disconnect();
  });
});
