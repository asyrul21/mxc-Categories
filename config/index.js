const connectCategoriesRoutesAndAffectedModels = (
  app,
  affectedModels = [],
  routeHandle = "/api/userRoles"
) => {
  const categoriesRoutes = require("../routes/categoryRoutes");
  app.use(`${routeHandle}/categories`, categoriesRoutes);
  let models = [];
  if (affectedModels && affectedModels.length > 0) {
    affectedModels.map((clientModel, index) => {
      models[index] = clientModel;
    });
  }
  app.set("clientModels", models);
};

module.exports = { connectCategoriesRoutesAndAffectedModels };
