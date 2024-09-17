import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { fetchAllProfiles } from "@/queries/user-query";
import ProfileForm from "./_components/ProfileForm";
import ProfileTable from "./_components/ProfileTabel";

export default async function page({ searchParams }) {
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 10;

  // Fetch the data from your API or database based on the search and filter criteria
  const { user, totalPages, currentPage, totalRecords } =
    await fetchAllProfiles({
      page,
      limit,
    });

  return (
    <div className="border p-4 space-y-8">
      <ProfileForm />
      <ProfileTable profiles={user} />

      {limit < totalRecords && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/business"
        />
      )}
    </div>
  );
}
