import Layout from "@/components/Layout/Layout";

import { font18bold } from "@/constant";

import Notfound from "@/components/Notfound";
import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles";
import { fetchCategories } from "@/queries/category-and-subcategory";
import BusinessProfileCard from "./_components/BusinessProfileCard";
import BusinessProfileFiltering from "./_components/BusinessProfileFiltering";

export default async function Categories({ searchParams }) {
  const { categories } = await fetchCategories();
  const searchQuery = searchParams.search || "";
  const categoryFilter = searchParams.category || "";
  const subcategoryFilter = searchParams.subcategory || "";
  const countryFilter = searchParams.country || "";
  const ratingFilter = searchParams.rating || "";
  const claimedStatus = searchParams.claimed || false;
  const searchCity = searchParams.city || "";
  const openNow = searchParams.openNow || "";

  // Fetch the data from your API or database based on the search and filter criteria
  const { businessProfiles } = await fetchProfiles({
    searchQuery,
    categoryFilter,
    subcategoryFilter,
    countryFilter,
    ratingFilter,
    searchCity,
    claimedStatus,
    openNow,
  });

  // console.log(businessProfiles);
  // Loading placeholder
  const loadingPlaceholder = (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div className="h-44 mx-auto border rounded-md w-full" key={item}>
          <div className="flex flex-row items-center justify-center h-full space-x-5 animate-pulse">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col space-y-3">
              <div className="h-6 bg-gray-300 rounded-md w-36"></div>
              <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2  py-10">
        <h1 className={`text-primary_color ${font18bold} text-center py-8`}>
          Find your best company
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-8    lg:gap-x-4">
          {/* Filter Section */}
          <BusinessProfileFiltering categories={categories} />

          {/* Business Profile Section */}
          <div className="col-span-5 border-2 rounded-md p-6 space-y-4">
            {businessProfiles.length > 0 && (
              <>
                <div className="overflow-hidden w-full">
                  {businessProfiles.map((businessProfile) => (
                    <BusinessProfileCard
                      key={businessProfile.username}
                      businessProfile={businessProfile}
                      id={businessProfile.username}
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
                  {/* <PaginationComponent
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={data?.totalPages}
                  /> */}
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