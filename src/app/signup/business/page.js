import {
  fetchCategories,
  fetchSubcategories,
} from "@/queries/category-and-subcategory";
import { checkUserExistsWithUsername } from "@/queries/user-query";
import SignupForm from "./_components/SignupForm";

export default async function BusinessPage({ searchParams }) {
  const selectedCategoryId = searchParams.category_id;
  const username = searchParams.username;
  const [categoriesData, subcategoriesData] = await Promise.all([
    fetchCategories(),
    fetchSubcategories(selectedCategoryId || {}),
  ]);

  const categories = categoriesData.categories;
  const subcategories = subcategoriesData.subcategories;

  const isExit = await checkUserExistsWithUsername(username);

  return (
    <div>
      <SignupForm
        categories={categories}
        subcategories={subcategories}
        isExit={isExit}
      />
    </div>
  );
}
