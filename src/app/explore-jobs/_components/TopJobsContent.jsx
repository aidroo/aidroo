import Notfound from "@/components/Notfound";
import { TabsContent } from "@/components/ui/tabs";
import JobsCard from "./JobsCard";

export default function TopJobsContent({ plainJobs = [] }) {
  return (
    <TabsContent value="top">
      <div className="flex flex-col gap-4">
        {plainJobs?.length > 0 &&
          plainJobs?.map((job) => {
            return <JobsCard job={job} key={job.id} />;
          })}
        {plainJobs?.length === 0 && <Notfound />}
      </div>
    </TabsContent>
  );
}
