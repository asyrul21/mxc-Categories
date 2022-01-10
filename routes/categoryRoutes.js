const express = require("express");
const router = express.Router();
const {
  getCategories,
  deleteManyCategory,
  deleteCategory,
  updateCategory,
  createCategory,
} = require("../controllers/categoryController");

router
  .route("/")
  .get(getCategories)
  .post(requireLogin, mustBeAdmin, createCategory);
router.route("/deleteMany").post(requireLogin, mustBeAdmin, deleteManyCategory);
router
  .route("/:id")
  .put(requireLogin, mustBeAdmin, updateCategory)
  .delete(requireLogin, mustBeAdmin, deleteCategory);

module.exports = router;
