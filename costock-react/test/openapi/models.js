
const { OpenAPIClientAxios } = require("openapi-client-axios");

const api = new OpenAPIClientAxios({
  definition: "http://localhost:3200/swagger.yaml",
});
api.init();

describe("model APIs", function () {
  describe("#listModels", function () {
    it("should list all models", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });

  describe("#addModel", function () {
    it("should add a model", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });

  describe("#getModel", function () {
    it("should get a model", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });

  describe("#editModel", function () {
    it("should edit a model", async function () {
      const client = await api.getClient();
      
      console.log(client.api.getOperations());
    });
  });
});