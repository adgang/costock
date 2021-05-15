function orderController(redis) {
  function listOrders(req, res, next) {
    console.log("list Orders not implemented");
    res.json([]);
  }

  function addOrder(req, res, next) {
    console.log("add Order not implemented");
  }

  function getOrder(req, res, next) {
    console.log("get Order not implemented");
  }

  function editOrder(req, res, next) {
    console.log("edit Order not implemented");
  }

  return { listOrders, addOrder, getOrder, editOrder };
}

module.exports = orderController;
