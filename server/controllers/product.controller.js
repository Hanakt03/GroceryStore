const Product = require("../models/product.model");
const calPagination = require("../middleware/pagination");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  //Getting all products (all status only for admin)
  getAllProductsAdmin: (req, res, next) => {
    Product.getAllForAdmin((data) => {
      if (data) {
        req.data = data;
        next();
      }
    });
  },
  paginateProductAdmin: (req, res) => {
    const resultsPerPage = 10;
    let data = req.data;
    console.log(data);
    if (data) {
      const numOfResults = data.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.params.page ? Number(req.params.page) : 1;
      const startingLimit = (page - 1) * resultsPerPage;
      Product.paginationAdmin(startingLimit, resultsPerPage, (data) => {
        let { iterator, endingLink } = calPagination(page, numberOfPages, 2, 4);
        if (numOfResults < resultsPerPage) {
          iterator = 1;
          endingLink = 1;
        }
        console.log(data);
        res.json({
          status: "success",
          products: data,
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
  //For getting all products by default (Search purpose)
  getAllDefaultProducts: (req, res) => {
    Product.getAll((data) => {
      if (data) {
        res.json({ status: "success", products: data });
      } else {
        res.json({ status: "failed", msg: "Error!" });
      }
    });
  },

  //For Pagination
  getAllProducts: (req, res, next) => {
    Product.getAll((data) => {
      if (data) {
        req.data = data;
        next();
      }
    });
  },

  getProductsByCategory: (req, res, next) => {
    const { idCategory } = req.params;

    Product.getByCategory(idCategory, (data) => {
      req.products = { data, idCategory };
      next();
    });
  },
  paginateProduct: (req, res) => {
    const resultsPerPage = 10;
    let data = req.data;
    console.log(data);
    if (data) {
      const numOfResults = data.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.params.page ? Number(req.params.page) : 1;
      const startingLimit = (page - 1) * resultsPerPage;
      Product.pagination(startingLimit, resultsPerPage, (data) => {
        let { iterator, endingLink } = calPagination(page, numberOfPages, 2, 4);
        if (numOfResults < resultsPerPage) {
          iterator = 1;
          endingLink = 1;
        }
        console.log(data);
        res.json({
          status: "success",
          products: data,
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

  paginateProductByIdCate: (req, res) => {
    const resultsPerPage = 10;
    let { data, idCategory } = req.products;

    if (data) {
      const numOfResults = data.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.params.page ? Number(req.params.page) : 1;
      const startingLimit = (page - 1) * resultsPerPage;
      Product.paginationByCate(
        startingLimit,
        resultsPerPage,
        idCategory,
        (data) => {
          let { iterator, endingLink } = calPagination(
            page,
            numberOfPages,
            2,
            4
          );
          if (numOfResults < resultsPerPage) {
            iterator = 1;
            endingLink = 1;
          }
          res.json({
            status: "success",
            products: data,
            iterator,
            endingLink,
            page,
            numberOfPages,
          });
        }
      );
    } else {
      res.json({ status: "failed", error: "Can't get this product" });
    }
  },

  getProductById: (req, res) => {
    const { idProduct } = req.params;
    Product.getProduct(idProduct, (data) => {
      if (data) {
        res.json({ status: "success", product: data });
      } else {
        res.json({ status: "failed", error: "Can't get this product" });
      }
    });
  },
  getLatest: (req, res) => {
    Product.getLatestProduct((data) => {
      if (data) {
        res.json({ status: "success", products: data });
      } else {
        res.json({ status: "failed", error: "Can't get this product" });
      }
    });
  },

  getRelatedProducts: (req, res) => {
    const { idProduct, idCate } = req.params;

    Product.getRelated(idProduct, idCate, (data) => {
      if (data) {
        console.log(data);
        res.json({ status: "success", products: data });
      } else {
        res.json({ status: "failed", error: "Can't get this product" });
      }
    });
  },

  getUpdated: (req, res) => {
    const { idProduct, amount } = req.params;
    Product.updateProduct(idProduct, amount, (data) => {
      if (data) {
        res.json({ status: "success", msg: "update successfully" });
      } else {
        res.json({ status: "failed", error: "can't get this product" });
      }
    });
  },

  searchProductByName: (req, res) => {
    const { name } = req.params;
    Product.getProductByName(name, (data) => {
      if (data) {
        console.log(data);
        res.json({ status: "success", products: data });
      } else {
        res.json({ status: "failed", error: "Can't get this product" });
      }
    });
  },
  editProduct: (req, res) => {
    const newProduct = req.body;
    const imageFile = newProduct.values.Image;
    console.log("Test image");
    console.log(imageFile);
    // const absolutePath = path.resolve(imageFile);

    const destinationPath = __dirname.replace(
      "server\\controllers",
      `client\\public\\product\\${imageFile}`
    );
    console.log(destinationPath);

    fs.copyFile(
      `C:\\Users\\ADMIN\\Downloads\\${imageFile}`,
      destinationPath,
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("TEst upload");
      }
    );
    Product.editNewProduct(newProduct, (data) => {
      if (data) {
        res.json({ status: "success", msg: "update successfully" });
      } else {
        res.json({ status: "failed", error: "can't get this product" });
      }
    });
  },
  addNewProduct: (req, res) => {
    const newProduct = req.body;
    Product.addProduct(newProduct, (data) => {
      if (data) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed" });
      }
    });
  },
  deleteProduct: (req, res) => {
    const { idProduct } = req.params;
    Product.deleteProduct(idProduct, (data) => {
      if (data) {
        res.json({ ...data });
      } else {
        res.json({ status: "fail" });
      }
    });
  },
  deleteProductByCategory: (req, res) => {
    const { idCate } = req.params;
    Product.deleteProductByCate(idCate, (data) => {
      if (data) {
        res.json({ ...data });
      } else {
        res.json({ status: "fail" });
      }
    });
  },
};
