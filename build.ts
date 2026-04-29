import { Op } from "sequelize";
import { Category, initDb } from "./config/db";
import fs from "fs";

async function loadDataFromCategories() {
  await initDb();
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
      }
    },
  );
}

loadDataFromCategories();
