const { OpenAPIClientAxios } = require("openapi-client-axios");

const api = new OpenAPIClientAxios({
  definition: "http://localhost:3200/swagger.yaml",
});
api.init();

describe("device APIs", function () {
  describe("#getDeviceInventory", function () {
    it("should list all devices", async function () {
      const client = await api.getClient();
    });
  });

  describe("#addDevice", function () {
    it("should add a device", async function () {
      const client = await api.getClient();
    });
  });

  describe("#getDevice", function () {
    it("should get a device", async function () {
      const client = await api.getClient();
    });
  });

  describe("#editDevice", function () {
    it("should edit a device", async function () {
      const client = await api.getClient();
    });
  });
});
