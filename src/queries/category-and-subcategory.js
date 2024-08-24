import Subcategory from "@/components/Subcategory";
import Category from "@/config/model/category";

export async function fetchCategories() {
  try {
    const { rows: categories, count } = await Category.findAndCountAll();

    // Convert Sequelize instances to plain objects
    const plainCategories = categories.map((category) => category.toJSON());

    return { categories: plainCategories, totalRecords: count };
  } catch (error) {
    console.error(error);
    return { categories: [], totalRecords: 0 }; // Fallback in case of error
  }
}

export async function fetchSubcategories(categoryId) {
  try {
    const subcategories = await Subcategory.findAll({
      where: { categoryId },
    });

    return subcategories.map((subcategory) => subcategory.toJSON());
  } catch (error) {
    console.error(error);
    return [];
  }
}
