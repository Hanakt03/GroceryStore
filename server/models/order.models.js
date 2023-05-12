const sql = require("./db");

const Order = (order) => {
  this.id = order.ID;
  this.idCustomer = order.ID_Customer;
  this.totalQuantity = order.TotalQuantity;
  this.totalPrice = order.TotalPrice;
  this.location = order.Location;
  this.status = order.Status;
  this.dateOrder = order.DateOrder;
  this.note = Order.Note;
};

Order.getAll = (result) => {
  sql.query("SELECT * FROM `order`", (err, res) => {
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

Order.paginationOrder = (start, itemPerPage, result) => {
  sql.query(
    "SELECT * FROM `order` ORDER BY ID DESC LIMIT ?, ?",
    [start, itemPerPage],
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

Order.getOrderById = (idUser, result) => {
  sql.query(
    "SELECT ID, Status, Location, Note, DateOrder FROM `order` WHERE ID_CUSTOMER = ?",
    [idUser],
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

Order.addOrder = (order, result) => {
  const { idCustomer, totalQuantity, totalPrice, location, shipNote } = order;
  sql.query(
    "INSERT INTO `order`(`ID_Customer`, `TotalQuantity`, `TotalPrice`, `Location` , `Note`, `DateOrder`, `Status`) VALUES (?, ?, ?, ?, ?, ?, '1')",
    [idCustomer, totalQuantity, totalPrice, location, shipNote, new Date()],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...order });
      result({ id: res.insertId, ...order });
    }
  );
};
Order.updateStatus = (id, status, result) => {
  console.log(status);
  sql.query(
    "UPDATE `order` SET STATUS = ? WHERE ID = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { msg: "Can't update" });
    }
  );
};

Order.searchOrderByCustomer = (idCustomer, result) => {
  console.log(idCustomer);
  // if (idCustomer !== " ") {
  sql.query(
    "SELECT * FROM `order` WHERE CAST(ID_Customer as char) LIKE ? GROUP BY ID DESC",
    [`%${parseInt(idCustomer)}%`],
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
  // }
  // } else {
  //   sql.query("SELECT * FROM `order`", (err, res) => {
  //     if (err) {
  //       console.log("error", err);
  //       result(err);
  //       return;
  //     }
  //     if (res.length > 0) {
  //       result(res);
  //       return;
  //     }
  //     result(null);
  //     return;
  //   });
  // }
};
module.exports = Order;
