import Layout from "@/components/Layout/Layout";


import Notfound from "@/components/Notfound";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles";
import { fetchCategoriesWithOutLimit } from "@/queries/category-and-subcategory";

import BusinessProfileCard from "./_components/BusinessProfileCard";
import BusinessProfileFiltering from "./_components/BusinessProfileFiltering";
export const metadata = {
  title: "business",
};
// Fetch categories or business profiles for static generation
export default async function BusinessProfiles({ searchParams }) {
  const { categories } = await fetchCategoriesWithOutLimit();
  const searchQuery = searchParams.search || "";
  const categoryFilter = searchParams.category || "";
  const subcategoryFilter = searchParams.subcategory || "";
  const countryFilter = searchParams.country || "";
  const ratingFilter = searchParams.rating || "";
  const verifiedStatus = searchParams.verified || false;
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
      verifiedStatus,
      searchCity,
      openNow,
      page,
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2  py-10 ">
       

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-y-10   lg:gap-x-4">
          {/* Filter Section */}
          <BusinessProfileFiltering categories={categories} />

          {/* Business Profile Section */}
          <div className="col-span-5  lg:border rounded-md lg:p-6 space-y-2">
            {businessProfiles.length > 0 && (
              <>
                <div className=" w-full">
                  {businessProfiles.map((businessProfile) => (
                    <BusinessProfileCard
                      key={businessProfile?.username}
                      businessProfile={businessProfile}
                      username={businessProfile?.username}
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
                      lastShow
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
