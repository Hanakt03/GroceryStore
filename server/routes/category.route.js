const Category = require("../controllers/category.controller");

const router = require("express").Router();

module.exports = (app) => {
  router.get("/api/category", Category.getAllCategories);
  router.get("/api/admin/category/detail/:idCategory", Category.getDetail);
  router.get("/api/admin/category/search/:name", Category.findCategory);
  router.post("/api/admin/category/add", Category.addCategory);
  router.put("/api/admin/category/edit", Category.updateCategory);
  router.delete("/api/admin/category/delete/:idCate", Category.deleteCategory);

  app.use(router);
};
