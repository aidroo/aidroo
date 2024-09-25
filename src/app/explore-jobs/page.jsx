import Layout from "@/components/Layout/Layout";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import {
  fetchCategoriesWithOutLimit,
  fetchSubcategories,
} from "@/queries/category-and-subcategory";

import Notfound from "@/components/Notfound.jsx";
import fetchAllJobsWithUserDetails from "@/queries/jobs.js";
import CreateJobsAndProfileForm from "./_components/CreateJobsAndProfileForm.jsx";
import JobsCard from "./_components/JobsCard";
import JobsFilterComponents from "./_components/JobsFilterComponents";

export default async function Jobs({ searchParams }) {
  const searchInput = searchParams.search;
  const category = searchParams.category_id;
  const subcategory = searchParams.subcategory_id;
  const country = searchParams.country;
  const filter = searchParams.filter;
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 10;

  const [categoriesData, subcategoriesData] = await Promise.all([
    fetchCategoriesWithOutLimit(),
    fetchSubcategories(category || 1),
  ]);
  const all = false;
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

  const categories = categoriesData.categories;
  const subcategories = subcategoriesData.subcategories;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto my-14 px-4">
        <div className="flex justify-center  w-full">
          <h1 className="text-center text-2xl px-4 py-1 bg-primary_color w-fit text-white rounded-md my-8">
            Explore Jobs
          </h1>
        </div>
        <div className=" flex flex-col-reverse md:grid  md:grid-cols-5 gap-x-10 ">
          <div className="col-span-3 flex flex-col gap-8">
            <CreateJobsAndProfileForm
              categories={categories}
              subcategories={subcategories}
            />

            {/* post job card */}
            {plainJobs &&
              plainJobs.map((job) => {
                return <JobsCard job={job} key={job.id} />;
              })}
            {plainJobs.length === 0 && <Notfound />}

            {limit < totalRecords && (
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl="/explore-jobs"
              />
            )}
          </div>

          <div className="col-span-2 my-4 md:my-0">
            <JobsFilterComponents
              categories={categories}
              subcategories={subcategories}
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
