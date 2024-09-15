import { fetchPersonalProfiles } from "@/queries/admin-dashboard-getProfiles";

import PaginationComponent from "@/components/Pagination/PaginationComponent";
import ProfileTable from "./_components/ProfileTable";
import SearchBar from "./_components/SearchBar";

export default async function PersonalProfile({ searchParams }) {
  const searchQuery = searchParams.search || "";

  const countryFilter = searchParams.country || "";
  const limit = searchParams.limit || 10;
  const page = searchParams.page || 1;

  const { personalProfiles, totalPages, currentPage, totalRecords } =
    await fetchPersonalProfiles({
      searchQuery,
      countryFilter,
      limit,
      page,
    });

  return (
    <div className="  rounded-lg  space-y-6">
      <div className=" flex flex-col justify-center items-center space-y-8  ">
        <SearchBar
          searchQuery={searchQuery}
          countryFilter={countryFilter}
          baseUrl="/admin_dashboard/personal_profile"
        />

        <ProfileTable profiles={personalProfiles} />
        {limit < totalRecords && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            baseUrl="/admin_dashboard/personal_profile"
          />
        )}
      </div>
    </div>
  );
}
