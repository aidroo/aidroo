import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles";
import { fetchCategories } from "@/queries/category-and-subcategory";
import ProfileForm from "./_components/ProfileForm";
import ProfileTable from "./_components/ProfileTable";
import SearchBar from "./_components/SearchBar";

export default async function BusinessPage({ searchParams }) {
  const searchQuery = searchParams.search || "";
  const categoryFilter = searchParams.category || "";
  const countryFilter = searchParams.country || "";

  // Fetch the data from your API or database based on the search and filter criteria
  const { businessProfiles } = await fetchProfiles({
    searchQuery,
    categoryFilter,
    countryFilter,
  });
  const { categories } = await fetchCategories();

  return (
    <div className="rounded-lg space-y-6">
      <div className="flex flex-col justify-center items-center space-y-8">
        <div className="border p-4 rounded-md w-fit">
          <ProfileForm />
        </div>
        <SearchBar
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          countryFilter={countryFilter}
          categories={categories}
        />

        <ProfileTable profiles={businessProfiles} />
      </div>
    </div>
  );
}
