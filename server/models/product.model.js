const sql = require("./db");

const Product = (product) => {
  this.id = product.Id;
  this.name = product.Name;
  this.price = product.Price;
  this.idProducer = product.ID_Producer;
  this.image = product.Image;
  this.idCategory = product.ID_Category;
  this.quantity = product.Quantity;
  this.description = product.Description;
};

Product.getAllForAdmin = (result) => {
  sql.query(`SELECT * FROM product`, (err, res) => {
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

Product.getAll = (result) => {
  sql.query(`SELECT * FROM product WHERE Quantity > 0`, (err, res) => {
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

Product.getByCategory = (idCategory, result) => {
  console.log("Id Category " + idCategory);
  sql.query(
    `SELECT * FROM product WHERE ID_Category = ${idCategory}`,
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

Product.getLatestProduct = (result) => {
  sql.query(
    `SELECT * FROM product WHERE Quantity > 0 ORDER BY ID DESC LIMIT 5`,
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

Product.getProduct = (id, result) => {
  sql.query(
    `SELECT product.ID, product.ID_Producer, product.ID_Category, product.Name, product.Price, product.Image, product.Quantity, producer.Name as ProducerName, category.Name as CategoryName, Description FROM product, producer, category WHERE product.ID = ${id} AND producer.ID = product.ID_Producer AND product.ID_Category = category.ID;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err);
        return;
      }
      if (res.length > 0) {
        result(res[0]);
        return;
      }
      result(null);
      return;
    }
  );
};

Product.pagination = (start, itemPerPage, result) => {
  sql.query(
    `SELECT * FROM product WHERE Quantity > 0 ORDER BY ID DESC LIMIT ${start}, ${itemPerPage}`,
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

Product.paginationAdmin = (start, itemPerPage, result) => {
  sql.query(
    "SELECT product.ID, product.Name, product.Price, product.Image, product.Quantity, category.Name as CategoryName, Description FROM `product`, `category` WHERE product.ID_Category = category.ID ORDER BY ID DESC LIMIT ?, ?",
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

Product.paginationByCate = (start, itemPerPage, idCate, result) => {
  sql.query(
    `SELECT * FROM product  WHERE ID_Category = ${idCate} ORDER BY ID DESC LIMIT ${start}, ${itemPerPage}`,
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

Product.getRelated = (idProduct, idCate, result) => {
  sql.query(
    `SELECT * FROM product WHERE Quantity > 0 AND ID_Category = ${idCate} AND product.ID NOT IN ( SELECT ID FROM product WHERE ID = ${idProduct} ) LIMIT 5`,
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

Product.updateProduct = (idProduct, amountBuy, result) => {
  sql.query(
    `UPDATE product SET Quantity = Quantity - ${amountBuy} WHERE ID = ${idProduct}`,
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

Product.getProductByName = (name, result) => {
  sql.query(
    "SELECT product.ID, product.Name, product.Price, product.Image, product.Quantity, category.Name as CategoryName, Description FROM `product`, `category` WHERE product.ID_Category = category.ID AND product.Name LIKE ? GROUP BY ID DESC",
    [`%${name}%`],
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

Product.editNewProduct = (newProduct, result) => {
  const { ID, ID_Category, Image, Name, Price, Quantity, Description } =
    newProduct.values;

  sql.query(
    `UPDATE product SET ID_Category=${ID_Category}, Image = "${Image}", Name = "${Name}", Price = ${Price}, Quantity = Quantity + ${Quantity}, Description = "${Description}" WHERE ID = ${ID}`,
    (err, res) => {
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

Product.addProduct = (product, result) => {
  const { ID_Category, Image, Name, Price, Quantity, Description } =
    product.values;
  sql.query(
    "INSERT INTO `product`(`Name`, `Price`, `ID_Producer`, `Image`, `ID_Category`, `Quantity` ,`Description`) VALUES (?, ?, 1, ?, ?, ?, ?)",
    [Name, parseFloat(Price), Image, ID_Category, Quantity, Description],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...product.values });
      result({ id: res.insertId, ...product.values });
    }
  );
};

Product.deleteProduct = (id, result) => {
  sql.query("DELETE FROM `product` WHERE ID = ?", [id], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err);
      return;
    }
    result({ status: "success" });
  });
};

Product.deleteProductByCate = (idCate, result) => {
  sql.query(
    "DELETE FROM `product` WHERE ID_Category = ?",
    [idCate],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err);
        return;
      }
      result({ status: "success" });
    }
  );
};

module.exports = Product;
