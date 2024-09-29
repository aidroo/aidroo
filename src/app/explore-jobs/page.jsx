import Layout from "@/components/Layout/Layout";
import {
  fetchCategoriesWithOutLimit,
  fetchSubcategories,
} from "@/queries/category-and-subcategory";

import Loading from "@/components/Loading.jsx";
import { Tabs } from "@/components/ui/tabs.jsx";
import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles.js";
import fetchAllJobsWithUserDetails from "@/queries/jobs.js";
import { Suspense } from "react";
import BusinessProfileContent from "./_components/BusinessProfileContent.jsx";
import CreateJobsAndProfileForm from "./_components/CreateJobsAndProfileForm.jsx";
import JobsFilterComponents from "./_components/JobsFilterComponents";
import LatestJobsContent from "./_components/LatestJobsContent.jsx";
import TabsTriggerComponent from "./_components/TabsTriggerComponent.jsx";
import TopJobsContent from "./_components/TopJobsContent.jsx";

export default async function Jobs({ searchParams }) {
  const searchQuery = searchParams.search;
  const category = searchParams.category_id;
  const subcategory = searchParams.subcategory_id;
  const country = searchParams.country;
  const filter = searchParams.filter || "latest";
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 10;

  const [categoriesData, subcategoriesData] = await Promise.all([
    fetchCategoriesWithOutLimit(),
    fetchSubcategories(category || 1),
  ]);
  // latest jobs
  const all = false;
  let latestJobs;
  let latestJobTotalRecords = 0;
  let latestJobTotalPages = 0;
  let latestCurrentPage = 1;

  // top jobs
  let topJobs;
  let topJobTotalRecords = 0;
  let topJobTotalPages = 0;
  let topCurrentPage = 1;

  // business
  let businessProfiles;
  let businessProfilesTotalRecords = 0;
  let businessProfilesCurrentPage = 1;
  let businessProfilesTotalPages = 0;

  if (filter === "latest") {
    const allLatestJobs = await fetchAllJobsWithUserDetails(
      searchQuery,
      category,
      subcategory,
      country,
      all,
      "latest",
      page,
      limit
    );

    latestJobTotalRecords = allLatestJobs.totalRecords;
    latestJobTotalPages = allLatestJobs.totalPages;
    latestJobs = allLatestJobs.plainJobs;
    latestCurrentPage = allLatestJobs.currentPage;
  } else if (filter === "top") {
    const allTopJobs = await fetchAllJobsWithUserDetails(
      searchQuery,
      category,
      subcategory,
      country,
      all,
      "top",
      page,
      limit
    );
    topJobTotalRecords = allTopJobs.totalRecords;
    topJobTotalPages = allTopJobs.totalPages;
    topJobs = allTopJobs.plainJobs;
  } else if (filter === "business") {
    const allBusinessProfiles = await fetchProfiles({
      searchQuery,
      page,
      limit,
    });

    businessProfiles = allBusinessProfiles.businessProfiles;
    businessProfilesTotalRecords = allBusinessProfiles.totalRecords;
    businessProfilesCurrentPage = allBusinessProfiles.currentPage;
    businessProfilesTotalPages = allBusinessProfiles.totalPages;
  }

  const categories = categoriesData.categories;
  const subcategories = subcategoriesData.subcategories;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto my-14 px-4 ">
        <div className=" flex flex-col-reverse md:grid  md:grid-cols-6 gap-x-10 ">
          <div className="col-span-4 flex flex-col gap-8 ">
            <div className=" w-full flex  justify-center items-center">
              <h1 className="text-center text-2xl px-4  bg-primary_color w-fit text-white rounded-md  py-1">
                Explore Jobs
              </h1>
            </div>

            <CreateJobsAndProfileForm
              categories={categories}
              subcategories={subcategories}
            />
            <Tabs defaultValue="latest">
              <TabsTriggerComponent />
              <Suspense fallback={Loading}>
                <LatestJobsContent
                  plainJobs={latestJobs}
                  totalRecords={latestJobTotalRecords}
                  totalPages={latestJobTotalPages}
                  currentPage={latestCurrentPage}
                />
              </Suspense>
              <Suspense fallback={Loading}>
                <TopJobsContent
                  plainJobs={topJobs}
                  totalRecords={topJobTotalRecords}
                  totalPages={topJobTotalPages}
                  currentPage={topCurrentPage}
                />
              </Suspense>
              <Suspense fallback={Loading}>
                <BusinessProfileContent
                  businessProfiles={businessProfiles}
                  totalRecords={businessProfilesTotalRecords}
                  totalPages={businessProfilesTotalPages}
                  currentPage={businessProfilesCurrentPage}
                />
              </Suspense>
            </Tabs>
            {/* post job card */}
          </div>

          <div className="col-span-2 my-4 md:my-0  pt-[74px]">
            <JobsFilterComponents
              categories={categories}
              subcategories={subcategories}
              filter={filter}
            />
          </div>
        </div>
        {/* report this review */}
        {/* <form className="border-2 p-6 rounded-md space-y-4 ">
          <h1 className={`${font18bold}`}>Report this review?</h1>
          <div className="border-2" />
          <h1 className={`${font16}`}>Please choose a reson</h1>
          <ul className="ms-4 space-y-1 mt-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className=" h-4 w-4 rounded-full" />
              <Label htmlFor="terms" className={`${font14}`}>
                Offensive or Inappropriate Content
              </Label>
            </div>

            <OptionSelect options={options} className="w-64" label="Label" />
          </ul>

          <div className="flex gap-4 max-w-64 ">
            <Button variant="hoverButton">Submit</Button>
            <Button variant="hoverButton">Close</Button>
          </div>
        </form> */}
      </div>
    </Layout>
  );
}
