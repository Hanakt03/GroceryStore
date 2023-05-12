const orderDetail = require("../models/orderDetail.model");

module.exports = {
  addDetail: (req, res, err) => {
    const orderItem = req.body;
    const { idOrder } = req.params;
    orderDetail.addOrder(idOrder, orderItem, (data) => {
      if (data) {
        res.json({ status: "success", ...data });
      } else {
        res.json({ status: "failed", msg: "Error!" });
      }
    });
  },
  getDetailByID: (req, res, err) => {
    const { idOrder } = req.params;
    orderDetail.getAllByID(idOrder, (data) => {
      if (data) {
        res.json({ status: "success", orders: data });
      } else {
        res.json({ status: "failed", msg: "Error!" });
      }
    });
  },
};
