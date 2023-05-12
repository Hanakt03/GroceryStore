const sql = require("./db");

const OrderDetail = (order) => {
  this.idOrder = order.ID_order;
  this.idProduct = order.ID_product;
  this.quantity = order.Quantity;
  this.price = order.Price;
};

OrderDetail.getAll = (result) => {
  sql.query(`SELECT * FROM order`, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    if (res.length > 0) {
      result(res);
      return;
    }
    result(null);
    return;
  });
};

OrderDetail.getAllByID = (idOrder, result) => {
  sql.query(
    "SELECT product.Name, orderdetail.Price, product.Image, orderdetail.Quantity FROM `orderdetail`, `product` WHERE ID_Order = ? AND orderdetail.ID_product = product.ID",
    [idOrder],
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.length > 0) {
        result(res);
        return;
      }
      result(null);
      return;
    }
  );
};

OrderDetail.addOrder = (idOrder, orderItem, result) => {
  const { idProduct, quantity, price } = orderItem;

  sql.query(
    "INSERT INTO `orderdetail` (`ID_order`, `ID_product`, `Quantity`, `Price`) VALUES (?, ?, ?, ?)",
    [idOrder, idProduct, quantity, price],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err);
        return;
      }
      console.log("added order: ", { orderItem });
      result({ orderItem });
    }
  );
};

module.exports = OrderDetail;
