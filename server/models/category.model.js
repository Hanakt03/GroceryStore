const sql = require("./db");

const Category = (category) => {
  this.id = user.Id;
  this.name = Category.Name;
  this.status = user.Status;
};

Category.getAll = (result) => {
  sql.query(`SELECT * FROM category`, (err, res) => {
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

Category.getDetail = (id, result) => {
  sql.query(`SELECT * FROM category where ID = ${id}`, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    if (res.length > 0) {
      result(res[0]);
      return;
    }
  });
};
Category.addCategory = (newCate, result) => {
  const { Name, Status } = newCate.values;
  sql.query(
    "INSERT INTO `category`(`Name`, `Status`) VALUES (?, ?)",
    [Name, Status],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newCate.values });
      result({ id: res.insertId, ...newCate.values });
    }
  );
};
Category.editCategory = (cate, result) => {
  const { ID, Name, Status } = cate.values;
  sql.query(
    `UPDATE category SET Name = "${Name}", Status = ${Status} WHERE ID = ${ID}`,
    (err, res) => {
      console.log(res);
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.affectedRows === 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result({ status: "success" });
      return;
    }
  );
};

Category.deleteCategory = (id, result) => {
  sql.query("DELETE FROM `category` WHERE ID = ?", [id], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err);
      return;
    }
    result({ status: "success" });
  });
};

Category.getCategoryByName = (name, result) => {
  sql.query(
    `SELECT * FROM category WHERE Name LIKE "%${name}%" GROUP BY ID DESC`,
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

module.exports = Category;
