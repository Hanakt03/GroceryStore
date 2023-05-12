const Product = require("../controllers/product.controller");

const router = require("express").Router();

module.exports = (app) => {
  router.get(
    "/api/admin/products/:page",
    Product.getAllProductsAdmin,
    Product.paginateProductAdmin
  );
  router.get("/api/product/:idProduct", Product.getProductById);
  router.get("/api/latestProduct", Product.getLatest);
  router.get(
    "/api/product/page/:page",
    Product.getAllProducts,
    Product.paginateProduct
  );
  router.get(
    "/api/product/page/:page/cate/:idCategory",
    Product.getProductsByCategory,
    Product.paginateProductByIdCate
  );
  router.get("/api/product/search/:name", Product.searchProductByName);

  router.get(
    "/api/product/:idProduct/cate/:idCate",
    Product.getRelatedProducts
  );
  router.post("/api/admin/addProduct", Product.addNewProduct);

  router.put("/api/product/:idProduct/amount/:amount", Product.getUpdated);
  router.put("/api/admin/editProduct", Product.editProduct);

  router.delete("/api/admin/deleteProduct/:idProduct", Product.deleteProduct);
  router.delete(
    "/api/admin/deleteProduct/cate/:idCate",
    Product.deleteProductByCategory
  );

  app.use(router);
};
