import Subcategory from "@/components/Subcategory";
import Category from "@/config/model/category";

export async function fetchCategories(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;
    const { rows: categories, count: totalRecords } =
      await Category.findAndCountAll({
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
      });

    // Convert Sequelize instances to plain objects
    const plainCategories = categories.map((category) => category.toJSON());
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      categories: plainCategories,
      totalRecords,
      totalPages,
      currentPage: page,
    };
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
