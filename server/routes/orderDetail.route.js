const orderDetail = require("../controllers/orderDetail.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/api/detail/:idOrder", orderDetail.addDetail);
  router.get("/api/detailOrder/:idOrder", orderDetail.getDetailByID);
  app.use(router);
};
