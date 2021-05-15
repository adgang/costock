function deviceController(redis) {
  function listDevices(req, res, next) {
    console.log("list Devices not implemented");
    res.json([]);
  }

  function addDevice(req, res, next) {
    console.log("add Device not implemented");
  }

  function getDevice(req, res, next) {
    console.log("get Device not implemented");
  }

  function editDevice(req, res, next) {
    console.log("edit Device not implemented");
  }

  return { listDevices, addDevice, getDevice, editDevice };
}

module.exports = deviceController;
