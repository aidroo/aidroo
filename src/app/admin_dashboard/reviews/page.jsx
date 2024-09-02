import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { getAllReviews } from "@/queries/reviews";
import ReviewSearchBar from "./_components/ReviewSearchBar";
import ReviewTable from "./_components/ReviewTable";

export default async function Review({ searchParams }) {
  const searchQuery = searchParams.search || "";

  const limit = parseInt(searchParams.limit) || 10;
  const page = parseInt(searchParams?.page) || 1;

  // Fetch data from the server-side function
  const {
    reviews,

    totalPages,
    currentPage,
    totalRecords,
  } = await getAllReviews(page, limit, searchQuery);

  // const baseUrl = `/business/${id}/reviews`;
  return (
    <div className="rounded-lg space-y-6">
      <div className="flex flex-col justify-center items-center space-y-8">
        <div className="border p-4 rounded-md w-fit z-10">
          {/* <ReviewAndProfileCreateDialog /> */}
        </div>
        <ReviewSearchBar
          searchQuery={searchQuery}
          options={reviews}
          // countryFilter={countryFilter}
        />

        {/* <CommandInput
          placeholder="Search review title or comment"
          baseUrl="/api/admin_dashboard/reviews"
          searchQuery={searchQuery}
          reviews={reviews}
        /> */}

        <ReviewTable reviews={reviews} />
      </div>
      {limit < totalRecords && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          baseUrl="/admin_dashboard/reviews"
        />
      )}
    </div>
  );
}
