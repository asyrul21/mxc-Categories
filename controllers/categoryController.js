const CategoryModel = require("../models/Category");

const getCategories = (req, res) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(400);
    next(new Error("Get categories failed. " + error));
  }
};

//@access       Private/Admin
const createCategory = (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new CategoryModel({
      name,
      description,
    });
    await category.save();
    const result = await CategoryModel.find();
    return res.status(201).json(result);
  } catch (error) {
    res.status(400);
    next(new Error("Create category failed. " + error.message));
  }
};

//@access       Private/Admin
const deleteCategory = (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    await category.remove();
    const result = await CategoryModel.find();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400);
    next(new Error("Delete category failed. " + error.message));
  }
};

// deleteMany
const deleteManyCategory = (req, res) => {
  const { categoryIds } = req.body;
  try {
    if (!categoryIds || categoryIds.length < 1) {
      throw "Nothing to delete.";
    }
    for await (let catId of categoryIds) {
      const Category = await CategoryModel.findById(catId);
      if (Category) {
        await Category.remove();
      }
    }
    const Categories = await CategoryModel.find()
    return res.status(200).json(Categories);
  } catch (error) {
    console.error(error);
    res.status(400);
    next(new Error("Delete many categories failed. " + error.message));
  }
};

//@access       Private/Admin
const updateCategory = (req, res) => {
  try {
    const { name, description } = req.body;
    const Category = await CategoryModel.findById(req.params.id);
    Category.name = name || Category.name;
    if (!description === null && !description === undefined) {
      Category.description = categoryDescription;
    }
    await Category.save();
    const result = await CategoryModel.find();
    return res.status(200).json(result);
  } catch (error) {
    res.status(400);
    console.error(error);
    next(new Error("Update category failed. " + error.message));
  }
};

module.exports = {
  getCategories,
  createCategory,
  getCategories,
  deleteCategory,
  deleteManyCategory,
  updateCategory,
};
