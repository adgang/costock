const { OpenAPIClientAxios } = require("openapi-client-axios");

const api = new OpenAPIClientAxios({
  definition: "http://localhost:3200/swagger.yaml",
});
api.init();

describe("donation APIs", function () {
  describe("#addDonation", function () {
    it("should create a donation", async function () {
      const client = await api.getClient();
    });
  });
});