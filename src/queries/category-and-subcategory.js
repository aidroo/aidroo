import db from "@/config/model";

export async function fetchCategories(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;
    const { rows: categories, count: totalRecords } =
      await db.Category.findAndCountAll({
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
    return { categories: [], totalRecords: 0 };
  }
}
export async function fetchCategoriesWithOutLimit() {
  try {
    const categories = await db.Category.findAll({
      order: [["createdAt", "DESC"]],
    });

    // Convert Sequelize instances to plain objects
    const plainCategories = categories.map((category) => category.toJSON());

    return {
      categories: plainCategories,
    };
  } catch (error) {
    console.error(error);
    return { categories: [], totalRecords: 0 };
  }
}

export async function fetchSubcategories(category_id, page = 1, limit = 10) {
  if (!category_id) {
    return { categories: [], totalRecords: 0 };
  }
  try {
    const offset = (page - 1) * limit;
    const { rows: subcategories, count: totalRecords } =
      await db.Subcategory.findAndCountAll({
        where: { categoryId: category_id },
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
      });

    // Convert Sequelize instances to plain objects
    const plainSubcategories = subcategories.map((category) =>
      category.toJSON()
    );
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      subcategories: plainSubcategories,
      totalRecords,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error(error);
    return { subcategories: [], totalRecords: 0, error };
  }
}
