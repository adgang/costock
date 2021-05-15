const express = require("express");
const OpenApiValidator = require('express-openapi-validator')

const {connector, summarise} = require('swagger-routes-express')
const YAML = require('yamljs')
const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();


const yamlSpecFile = './public/swagger.yaml'
const apiDefinition = YAML.load(yamlSpecFile)
const apiSummary = summarise(apiDefinition)
console.info(apiSummary)

const app = express();

app.use("/swagger-ui", express.static(pathToSwaggerUi));
app.use(express.static('public'))

const validatorOptions = {
  coerceTypes: true,
  apiSpec: yamlSpecFile,
  validateRequests: true,
  validateResponses: true
}
app.use(OpenApiValidator.middleware(validatorOptions))
  
// error customization, if request is invalid
app.use((err, req, res, next) => {
  res.status(err.status).json({
    error: {
      type: 'request_validation',
      message: err.message,
      errors: err.errors
    }
  })
})

const api = {
  listModels: (req, res) => {
    console.log(req)
    console.log("bb")
    res.json({"a": 1})
  }
}

const connect = connector(api, apiDefinition, {
  onCreateRoute: (method, descriptor) => {
    console.log(`${method}: ${descriptor[0]} : ${(descriptor[1]).name}`)
  }
})

connect(app)


app.listen(3200);
