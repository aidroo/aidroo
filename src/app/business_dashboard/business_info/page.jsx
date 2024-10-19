import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
import {
  fetchCategoriesWithOutLimit,
  fetchSubcategories,
} from "@/queries/category-and-subcategory";
import BusinessProfileUpdatedForm from "./_components/BusinessProfileUpdatedForm";

export default async function BusinessProfile({ searchParams }) {
  const selectedCategoryId = searchParams.category_id;
  const username = searchParams.username;
 
  const [categoriesData, subcategoriesData, profile] = await Promise.all([
    fetchCategoriesWithOutLimit(),
    fetchSubcategories(selectedCategoryId || {}),

    fetchSingleProfile({ username }),
  ]);

  return (
   
      <BusinessProfileUpdatedForm
        categories={categoriesData.categories}
        subcategories={subcategoriesData.subcategories}
        profile={profile.profile}
        username={username}
      />
     
  );
}
