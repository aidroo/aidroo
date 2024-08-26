import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { getAllReviews } from "@/queries/reviews";
import ReviewSearchBar from "./_components/ReviewSearchBar";

let str =
  "Lorem ipsum dolor sit amet consectetur  Lorem ipsum dolor sit amet consectetur";
export default async function Review({ searchParams }) {
  const searchQuery = searchParams.search || "";

  const countryFilter = searchParams.country || "";

  const limit = parseInt(searchParams.limit) || 10;
  const page = parseInt(searchParams?.page) || 1;
  // Fetch data from the server-side function
  const {
    reviews,

    totalPages,
    currentPage,
    totalRecords,
  } = await getAllReviews(page, limit);

  // const baseUrl = `/business/${id}/reviews`;
  return (
    <div className="rounded-lg space-y-6">
      <div className="flex flex-col justify-center items-center space-y-8">
        <div className="border p-4 rounded-md w-fit">
          {/* <ProfileForm /> */}
        </div>
        <ReviewSearchBar
          searchQuery={searchQuery}
          countryFilter={countryFilter}
        />
        {/* 
        {} ** <ProfileTable
          profiles={businessProfiles}
          limit={limit}
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
        /> */}
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
