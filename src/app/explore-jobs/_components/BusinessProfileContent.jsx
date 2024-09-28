import BusinessProfileCard from "@/app/business/_components/BusinessProfileCard";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { TabsContent } from "@/components/ui/tabs";

export default function BusinessProfileContent({
  businessProfiles = [],
  totalRecords,
  totalPages,
  currentPage,
}) {
  return (
    <TabsContent value="business">
      <div className=" w-full">
        {businessProfiles.length > 0 &&
          businessProfiles.map((businessProfile) => (
            <BusinessProfileCard
              key={businessProfile?.username}
              businessProfile={businessProfile}
              id={businessProfile?.username}
            />
          ))}
      </div>
      {10 < totalRecords && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/explore-jobs?filter=business&"
        />
      )}
    </TabsContent>
  );
}
