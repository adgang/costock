function listModels(req, res) {
  console.log(req);
  console.log("bb");
  res.json({ a: 1 });
}

module.exports = { listModels }
