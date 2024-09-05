import PaginationComponent from "@/components/Pagination/PaginationComponent";
import {
  fetchCategories,
  fetchSubcategories,
} from "@/queries/category-and-subcategory";
import Category from "./_components/Category";
import Subcategory from "./_components/Subcategory";

export default async function Categories({ searchParams }) {
  const limit = parseInt(searchParams.limit) || 10;
  const page = parseInt(searchParams?.page) || 1;
  const selectedCategoryId = parseInt(searchParams?.category_id);

  const { categories, totalPages, currentPage, totalRecords } =
    await fetchCategories(page, limit);

  const { subcategories } = await fetchSubcategories(selectedCategoryId || {});

  return (
    <div className="space-y-10">
      {/* Category */}
      <div className="grid grid-cols-2 gap-10 border rounded-lg p-10">
        <Category categories={categories} />
        {limit < totalRecords && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            baseUrl="/admin_dashboard/categories"
          />
        )}
      </div>

      {/* Sub Category */}
      <Subcategory categories={categories} subcategories={subcategories} />
    </div>
  );
}
