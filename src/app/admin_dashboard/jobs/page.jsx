import PaginationComponent from "@/components/Pagination/PaginationComponent";
import {
  fetchCategoriesWithOutLimit,
  fetchSubcategories,
} from "@/queries/category-and-subcategory";
import fetchAllJobsWithUserDetails from "@/queries/jobs";
import JobsAndProfileCreatedForm from "./_components/JobAndProfileCreatedForm";
import JobsFilterForm from "./_components/JobsFilterForm";
import JobsTable from "./_components/JobsTable";

export default async function Jobs({ searchParams }) {
  const searchInput = searchParams.search;
  const category = searchParams.category_id;
  const subcategory = searchParams.subcategory_id;
  const country = searchParams.country;
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 10;

  // Fetch data from the server-side function

  const all = true;
  const filter = "latest";
  const { plainJobs, totalRecords, currentPage, totalPages } =
    await fetchAllJobsWithUserDetails(
      searchInput,
      category,
      subcategory,
      country,
      all,
      filter,
      page,
      limit
    );

  const [categoriesData, subcategoriesData] = await Promise.all([
    fetchCategoriesWithOutLimit(),
    fetchSubcategories(category || 1),
  ]);

  const categories = categoriesData.categories;
  const subcategories = subcategoriesData.subcategories;
  // const baseUrl = `/business/${id}/reviews`;
  return (
    <div className="rounded-lg space-y-6 border p-2">
      {
        <JobsAndProfileCreatedForm
          categories={categories}
          subcategories={subcategories}
        />
      }

      <div className="flex flex-col justify-center items-center space-y-8 p-2">
        <JobsFilterForm categories={categories} subcategories={subcategories} />

        <JobsTable jobs={plainJobs} />
      </div>
      {limit < totalRecords && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          baseUrl="/admin_dashboard/jobs?"
        />
      )}
    </div>
  );
}
