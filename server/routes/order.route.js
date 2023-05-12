const Order = require("../controllers/order.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.get(
    "/api/admin/orders/page/:page",
    Order.getAllOrders,
    Order.paginateOrder
  );
  router.get("/api/getOrders/:idUser", Order.getIDOrder);
  router.get("/api/admin/order/find/:idCustomer", Order.searchOrder);
  router.post("/api/checkout", Order.addToCart);
  router.put("/api/admin/order/status", Order.updateStatus);
  app.use(router);
};
