const { OpenAPIClientAxios } = require("openapi-client-axios");

const api = new OpenAPIClientAxios({
  definition: "http://localhost:3200/swagger.yaml",
});
api.init();

describe("order APIs", function () {
  describe("#listOrders", function () {
    it("should list all orders", async function () {
      const client = await api.getClient();
    });
  });

  describe("#addOrder", function () {
    it("should add a order", async function () {
      const client = await api.getClient();
    });
  });

  describe("#getOrder", function () {
    it("should get a order", async function () {
      const client = await api.getClient();
    });
  });

  describe("#editOrder", function () {
    it("should edit a order", async function () {
      const client = await api.getClient();
    });
  });
});
