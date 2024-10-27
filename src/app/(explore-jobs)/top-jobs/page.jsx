import Notfound from "@/components/Notfound";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import axiosInstance from "@/lib/axios";
import JobsCard from "../_components/JobsCard";

 
export default async function page({ searchParams }) {
 
  const limit = searchParams.limit || 10;
  const page = searchParams.page || 1;

  // Get query parameters
  const searchQuery = searchParams.search||'';
  const country = searchParams.country || '';
  const category = searchParams.category||'';
  const subcategory = searchParams.subcategory||'';
  
  try {
    const response = await axiosInstance.get("/api/jobs", {
      params: {
        filter: "top",
        search: searchQuery,
            country,
            category,
            subcategory,
            page,
            limit,
      },
      //   params: {
      //     search: searchQuery,
      //     filter,
      //     country,
      //     category,
      //     subcategory,
      //     page,
      //     limit,
      //   },
    });

    const { jobs: plainJobs } = response.data;
    
    const {
      total_records: totalRecords,
      total_pages: totalPages,
      current_page: currentPage,
    } = response.headers;

    return (
      <div className="flex flex-col gap-4">
        {plainJobs && plainJobs.length > 0 ? (
          plainJobs.map((job) => <JobsCard job={job} key={job.id} />)
        ) : (
          <Notfound />
        )}

        {totalRecords > 10 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/latest-jobs?"
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return <Notfound />;
  }
}
