const { connectCategoriesRoutesAndAffectedModels } = require("./config");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteManyCategory,
} = require("./controllers/categoryController");

module.exports = {
  connectCategoriesRoutesAndAffectedModels,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteManyCategory,
};
