
const { OpenAPIClientAxios } = require("openapi-client-axios");

const api = new OpenAPIClientAxios({
  definition: "http://localhost:3200/swagger.yaml",
});
api.init();

describe("APIs", function () {
  describe("#donations", function () {
    it("should create a donation", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });
});