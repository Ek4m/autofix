import fs from "fs";
import { getAllCategories, getBrandsAndModels } from "./modules/build/services";

async function loadDataFromCategories() {
  const allCategories = await getAllCategories();
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
  const response = await getBrandsAndModels();
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
  await loadDataFromCategories();
  await loadDataFromBrandsAndModels();
})();
