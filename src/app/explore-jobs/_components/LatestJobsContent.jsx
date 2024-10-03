import Notfound from "@/components/Notfound";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { TabsContent } from "@/components/ui/tabs";
import JobsCard from "./JobsCard";

export default function LatestJobsContent({
  plainJobs = [],
  totalRecords,
  totalPages,
  currentPage,
}) {
  return (
    <TabsContent value="latest">
      <div className="flex flex-col gap-4">
        {plainJobs &&
          plainJobs.map((job) => {
            return <JobsCard job={job} key={job.id} />;
          })}
        {plainJobs?.length === 0 && <Notfound />}

        {10 < totalRecords && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/explore-jobs?"
          />
        )}
      </div>
    </TabsContent>
  );
}
