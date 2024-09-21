// import {
//   fetchCategoriesWithOutLimit,
//   fetchSubcategories,
// } from "@/queries/category-and-subcategory";

import { TabsContent } from "@radix-ui/react-tabs";

export default async function JobsContent() {
  // const selectedCategoryId = searchParams.category_id;

  // const [categoriesData, subcategoriesData] = await Promise.all([
  //   fetchCategoriesWithOutLimit(),
  //   fetchSubcategories(selectedCategoryId || 1),
  // ]);

  // const categories = categoriesData.categories;
  // const subcategories = subcategoriesData.subcategories;

  return (
    <TabsContent value="job">
      <h1>0 Jobs Posted</h1>
      {/* <CreateForm categories={categories} subcategories={subcategories} /> */}
      {/* post job card */}
      {/* <div>
          <div className="w-full rounded-lg border-2 p-6 flex flex-col space-y-4">
            <h1
              className={` ${font16}text-primary_color flex items-center gap-4`}
            >
              Looking for sels manager
            </h1>
            <div className="flex flex-col items-center justify-center">
              <p
                className={`text-justify text-gray-400 tracking-tight ${font14}`}
              >
                I had a seamless experience with Panacea. Other companies denied
                me credit due to not providing evidence of income. Other financial
                institutions that are supposedly for medical professionals.
              </p>
            </div> */}

      {/* image */}
      {/* <div className="flex gap-4 ">
              <div className="dark:ring-offset-slate-700 rounded w-24 md:w-32 shrink-0 overflow-hidden">
                <ResponsiveImage
                  src={profilePic}
                  alt="profile image"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="dark:ring-offset-slate-700 rounded  w-24 md:w-32 shrink-0 overflow-hidden">
                <ResponsiveImage
                  src={profileImage}
                  alt="profile image"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <h1 key={item} className="text-primary_color text-xs">
                  #job
                </h1>
              ))}
            </div>
  
            <Button
              variant="hover"
              size="sm"
              className=" max-w-40 mx-auto rounded-full   hover:ring-1 ring-primary_color ring-offset-2 animate-in duration-100 hover:zoom-in-50"
            >
              Apply Now
            </Button>
          </div>
        </div> */}
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
    </TabsContent>
  );
}
