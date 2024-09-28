import Layout from "@/components/Layout/Layout";

import { font18bold } from "@/constant";

import Notfound from "@/components/Notfound";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles";
import { fetchCategoriesWithOutLimit } from "@/queries/category-and-subcategory";

import BusinessProfileCard from "./_components/BusinessProfileCard";
import BusinessProfileFiltering from "./_components/BusinessProfileFiltering";
export const metadata = {
  title: "business",
};

export default async function Categories({ searchParams }) {
  const { categories } = await fetchCategoriesWithOutLimit();
  const searchQuery = searchParams.search || "";
  const categoryFilter = searchParams.category || "";
  const subcategoryFilter = searchParams.subcategory || "";
  const countryFilter = searchParams.country || "";
  const ratingFilter = searchParams.rating || "";
  const claimedStatus = searchParams.claimed || false;
  const searchCity = searchParams.city || "";
  const openNow = searchParams.openNow || "";
  const limit = searchParams.limit || 10;
  const page = parseInt(searchParams?.page) || 1;

  // Fetch the data from your API or database based on the search and filter criteria
  const { businessProfiles, totalRecords, totalPages, currentPage } =
    await fetchProfiles({
      searchQuery,
      categoryFilter,
      subcategoryFilter,
      countryFilter,
      ratingFilter,
      searchCity,
      claimedStatus,
      openNow,
      page,
      limit,
    });

  // console.log(businessProfiles);
  // Loading placeholder
  // const loadingPlaceholder = (
  //   <div className="flex flex-col gap-4">
  //     {[1, 2, 3, 4].map((item) => (
  //       <div className="h-44 mx-auto border rounded-md w-full" key={item}>
  //         <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
  //           <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
  //           <div className="flex flex-col space-y-3">
  //             <div className="h-6 bg-gray-300 rounded-md w-36"></div>
  //             <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  if (!businessProfiles) {
    return <h1>not found</h1>;
  }
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2  py-10 ">
        <h1 className={`text-primary_color ${font18bold} text-center py-8`}>
          Find your best company
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-10   lg:gap-x-4">
          {/* Filter Section */}
          <BusinessProfileFiltering categories={categories} />

          {/* Business Profile Section */}
          <div className="col-span-5  lg:border-2 rounded-md lg:p-6 space-y-4">
            {businessProfiles.length > 0 && (
              <>
                <div className=" w-full">
                  {businessProfiles.map((businessProfile) => (
                    <BusinessProfileCard
                      key={businessProfile?.username}
                      businessProfile={businessProfile}
                      id={businessProfile?.username}
                    />
                  ))}
                </div>

                <div className="flex">
                  {/* <OptionSelect
                    options={limitOptions}
                    className="max-w-24"
                    label="Select a Limit"
                    onChange={setLimit}
                    value={limit}
                  /> */}
                  {limit < totalRecords && (
                    <PaginationComponent
                      currentPage={currentPage}
                      totalPages={totalPages}
                      baseUrl="/business?"
                    />
                  )}
                </div>
              </>
            )}
            {!businessProfiles.length && <Notfound />}
          </div>
        </div>
      </div>
    </Layout>
  );
}
// 01766991955
