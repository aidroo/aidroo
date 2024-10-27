import Layout from "@/components/Layout/Layout";
import {
  fetchCategoriesWithOutLimit,
  fetchSubcategories,
} from "@/queries/category-and-subcategory";

 
import JobsFilterComponents from "./_components/JobsFilterComponents";
 
import JobsNavbar from "./_components/jobs-nabbar";
import JobsCreatedForm from "./_components/JobsForm";
 

export default async function ExploreJobsLayout({ children }) {
  

  const { categories } = (await fetchCategoriesWithOutLimit()) || [];

  const subcategories = (await fetchSubcategories(1)) || [];
  return (
    <Layout>
      <div className=" w-full max-w-7xl mx-auto grid  grid-cols-6 my-4 gap-8">
        {/* <div className=" w-full flex  justify-center items-center">
          <h1 className="  text-2xl px-4  bg-primary_color w-fit text-white rounded-md  py-1">
            Explore Jobs
          </h1>
        </div> */}

        <div className="col-span-4 flex flex-col gap-4 ">
          <JobsCreatedForm
            categories={categories}
            subcategories={subcategories}
          />
          <JobsNavbar />
          <div>{children}</div>
        </div>

        <div className="col-span-2    ">
          <JobsFilterComponents
            categories={categories}
            subcategories={subcategories || []}
            // filter={filter}
          />
        </div>
      </div>
    </Layout>
  );
}
