import { Op } from "sequelize";
import { CarBrand, CarModel, Category, initDb } from "./config/db";
import fs from "fs";

async function loadDataFromCategories() {
  const parentCategories = await Category.findAll({
    where: {
      parentId: {
        [Op.eq]: null,
      },
    },
    include: [{ model: Category, as: "subcategories" }],
  });

  const allCategories = parentCategories.map((cat) => ({
    ...cat.get(),
    subcategories: cat.get().subcategories,
  }));
  fs.writeFile(
    process.cwd() + "/data/categories.json",
    JSON.stringify(allCategories),
    (err) => {
      if (err) {
        console.log("Error writing to categories");
      } else {
        console.log(
          "\x1b[32m%s\x1b[0m",
          "Data exported successfully ===>  categories.json",
        );
      }
    },
  );
}

async function loadDataFromBrandsAndModels() {
  const response = await CarBrand.findAll({
    order: [["name", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: CarModel,
        as: "models",
        attributes: { exclude: ["createdAt", "updatedAt", "brandId"] },
      },
    ],
  });
  fs.writeFile(
    process.cwd() + "/data/brands.json",
    JSON.stringify(response),
    (err) => {
      if (err) {
        console.log("Error writing to categories");
      } else {
        console.log(
          "\x1b[32m%s\x1b[0m",
          "Data exported successfully ===>  brands.json",
        );
      }
    },
  );
}

(async () => {
  await initDb();
  await loadDataFromCategories();
  await loadDataFromBrandsAndModels();
})();
