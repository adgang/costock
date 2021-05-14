const express = require("express");
const pathToSwaggerUi = require("swagger-ui-dist").absolutePath();
const app = express();
app.use("/swagger-ui", express.static(pathToSwaggerUi));
app.use(express.static('public'))
app.listen(3200);
