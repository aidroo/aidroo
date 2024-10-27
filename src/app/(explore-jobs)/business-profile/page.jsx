import BusinessProfileCard from "@/app/business/_components/BusinessProfileCard";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles";

export default async function JobsBusinessProfile({ searchParams }) {
  const limit = searchParams.limit || 10;
  const page = searchParams.page || 1;
  const searchQuery = searchParams.search || "";
  const countryFilter = searchParams.country || "";
  const categoryFilter = searchParams.category || "";
  const subcategoryFilter = searchParams.subcategory || "";

  const allBusinessProfiles = await fetchProfiles({
    searchQuery,
    categoryFilter,
    subcategoryFilter,
    countryFilter,
    page,
    limit,
  });

  return (
    <div>
      <div className="flex flex-col">
        {allBusinessProfiles?.businessProfiles?.length > 0 &&
          allBusinessProfiles?.businessProfiles?.map((businessProfile) => (
            <BusinessProfileCard
              key={businessProfile?.username}
              businessProfile={businessProfile}
              id={businessProfile?.username}
            />
          ))}
      </div>
      {limit < 20 && (
        <PaginationComponent
          currentPage={allBusinessProfiles?.currentPage}
          totalPages={allBusinessProfiles?.totalPages}
          baseUrl="/business-profile?"
        />
      )}
    </div>
  );
}
