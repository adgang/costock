const express = require("express");
const { Redis } = require("./src/redis");
const OpenApiValidator = require("express-openapi-validator");

const { connector, summarise } = require("swagger-routes-express");
const YAML = require("yamljs");
const redis = new Redis();
const api = require("./src/controllers")(redis);

const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();

const yamlSpecFile = "./public/swagger.yaml";
const apiDefinition = YAML.load(yamlSpecFile);

const app = express();

app.use("/swagger-ui", express.static(pathToSwaggerUi));
app.use(express.static("public"));
app.use(express.json());

const validatorOptions = {
  coerceTypes: true,
  apiSpec: yamlSpecFile,
  validateRequests: true,
  validateResponses: true,
};
app.use(OpenApiValidator.middleware(validatorOptions));

// error customization, if request is invalid
app.use((err, req, res, next) => {
  res.status(err.status).json({
    error: {
      type: "request_validation",
      message: err.message,
      errors: err.errors,
    },
  });
});

const connect = connector(api, apiDefinition, {
  onCreateRoute: (method, descriptor) => {
    console.log(`${method}: ${descriptor[0]} : ${descriptor[1].name}`);
  },
});

connect(app);

app.listen(3200);
