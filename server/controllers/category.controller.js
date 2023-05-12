const Category = require("../models/category.model");
module.exports = {
  getAllCategories: (req, res) => {
    Category.getAll((data) => {
      if (data) {
        res.json({ status: "success", categories: data });
      } else {
        res.json({ status: "failed" });
      }
    });
  },
  getDetail: (req, res) => {
    const { idCategory } = req.params;
    Category.getDetail(idCategory, (data) => {
      if (data) {
        res.json({ status: "success", category: data });
      } else {
        res.json({ status: "failed" });
      }
    });
  },
  updateCategory: (req, res) => {
    const newCate = req.body;
    Category.editCategory(newCate, (data) => {
      if (data) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed" });
      }
    });
  },
  addCategory: (req, res) => {
    const cate = req.body;
    Category.addCategory(cate, (data) => {
      console.log(data);
      if (data) {
        res.json({ status: "success" });
      } else {
        res.json({ status: "failed" });
      }
    });
  },
  deleteCategory: (req, res) => {
    const { idCate } = req.params;
    Category.deleteCategory(idCate, (data) => {
      if (data) {
        res.json({ ...data });
      } else {
        res.json({ status: "fail" });
      }
    });
  },
  findCategory: (req, res) => {
    const { name } = req.params;
    Category.getCategoryByName(name, (data) => {
      if (data) {
        console.log(data);
        res.json({ status: "success", categories: data });
      } else {
        res.json({ status: "failed", error: "Can't get this product" });
      }
    });
  },
};
