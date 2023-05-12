const Order = require("../models/order.models");
const calPagination = require("../middleware/pagination");

module.exports = {
  getAllOrders: (req, res, next) => {
    Order.getAll((data) => {
      if (data) {
        req.data = data;
        next();
      }
    });
  },
  paginateOrder: (req, res) => {
    const resultsPerPage = 10;
    let data = req.data;
    console.log(data);
    if (data) {
      const numOfResults = data.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.params.page ? Number(req.params.page) : 1;
      const startingLimit = (page - 1) * resultsPerPage;
      Order.paginationOrder(startingLimit, resultsPerPage, (data) => {
        let { iterator, endingLink } = calPagination(page, numberOfPages, 2, 4);
        if (numOfResults < resultsPerPage) {
          iterator = 1;
          endingLink = 1;
        }
        console.log(data);
        res.json({
          status: "success",
          orders: data,
          iterator,
          endingLink,
          page,
          numberOfPages,
        });
      });
    } else {
      res.json({ status: "failed", error: "Can't get this product" });
    }
  },
  addToCart: (req, res, err) => {
    const order = req.body;
    Order.addOrder(order, (data) => {
      if (data) {
        res.json({ status: "success", ...data });
      } else {
        res.json({ status: "failed", msg: "Error!" });
      }
    });
  },
  getIDOrder: (req, res, err) => {
    const { idUser } = req.params;
    Order.getOrderById(idUser, (data) => {
      if (data) {
        res.json({ status: "success", orders: data });
      } else {
        res.json({ status: "failed", msg: "Error!" });
      }
    });
  },
  updateStatus: (req, res) => {
    const { id, status } = req.body;
    Order.updateStatus(id, status, (data) => {
      if (data) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed", error: "Can't get this idUser" });
      }
    });
  },
  searchOrder: (req, res) => {
    const { idCustomer } = req.params;
    Order.searchOrderByCustomer(idCustomer, (data) => {
      if (data) {
        console.log(data);
        res.json({ status: "success", orders: data });
      } else {
        res.json({ status: "failed", error: "Can't get this product" });
      }
    });
  },
};
