
const { OpenAPIClientAxios } = require("openapi-client-axios");

const api = new OpenAPIClientAxios({
  definition: "http://localhost:3200/swagger.yaml",
});
api.init();

describe("order APIs", function () {
  describe("#listOrders", function () {
    it("should list all orders", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });

  describe("#addOrder", function () {
    it("should add a order", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });

  describe("#getOrder", function () {
    it("should get a order", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });

  describe("#editOrder", function () {
    it("should edit a order", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });
});