import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles";
import { fetchCategories } from "@/queries/category-and-subcategory";
import { checkUserExistsWithUsername } from "@/queries/user-query";
import ProfileForm from "./_components/ProfileForm";
import ProfileTable from "./_components/ProfileTable";
import SearchBar from "./_components/SearchBar";

export default async function BusinessPage({ searchParams }) {
  const searchQuery = searchParams.search || "";
  const categoryFilter = searchParams.category || "";
  const countryFilter = searchParams.country || "";
  const username = searchParams.username || "";
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 10;

  // Fetch the data from your API or database based on the search and filter criteria
  const { businessProfiles, totalPages, currentPage, totalRecords } =
    await fetchProfiles({
      searchQuery,
      categoryFilter,
      countryFilter,
      page,
      limit,
    });
  const { categories } = await fetchCategories();

  const isExit = await checkUserExistsWithUsername(username);

  return (
    <div className="rounded-lg space-y-6">
      <div className="flex flex-col justify-center items-center space-y-8">
        <div className="border p-4 rounded-md w-fit">
          <ProfileForm categories={categories} isExit={isExit} />
        </div>
        <SearchBar
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          countryFilter={countryFilter}
          categories={categories}
        />

        <ProfileTable
          profiles={businessProfiles}
          limit={limit}
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
        />
      </div>
      {limit < totalRecords && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          baseUrl="/admin_dashboard/business_profile"
        />
      )}
    </div>
  );
}
