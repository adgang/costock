const { OpenAPIClientAxios } = require("openapi-client-axios");
const { server } = require("./constants");

const api = new OpenAPIClientAxios({
  definition: "http://localhost:3200/swagger.yaml",
  withServer: { url: server },
});
api.init();

describe("donation APIs", function () {
  describe("#addDonation", function () {
    it("should create a donation", async function () {
      const client = await api.getClient();
      console.log(client);
      const response = await client.addDonation(null, {
        name: "Alice Wonder",
        tax_id: "Blah",
        address: {
          line_1: "#234 Windsor",
          line_2: "Hiranandani",
          area: "Powai",
          city: "Mumbai",
          district: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
        },
        email: "abc@example.com",
        phone: "+911234567890",
        amount: "1234.45",
      });

      console.log(response.status);
    });
  });
});
