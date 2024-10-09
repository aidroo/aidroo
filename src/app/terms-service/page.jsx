import Layout from "@/components/Layout/Layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutTermsContent from "./_components/AboutTermsContent";
import JobsTermContent from "./_components/JobsTermsConditions";
import ReviewTermsContent from "./_components/ReviewsTermsContent";
import TermsAndConditions from "./_components/TermsAndConditions";

export default function TermsService() {
  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto mt-10 relative ">
        <Tabs
          defaultValue="terms-conditons"
          className="grid grid-cols-7 gap-0 md:gap-x-6 "
        >
          <TabsList className="flex flex-col h-fit gap-4 p-4  items-start col-span-2  sticky top-24   ">
            {/* business */}
            <TabsTrigger
              value="terms-conditons"
              className="py-3 w-full bg-white border"
            >
              <h1> Terms and conditons</h1>
            </TabsTrigger>
            {/* review */}
            <TabsTrigger
              value="review-privacy-policy"
              className="py-3 w-full bg-white border"
            >
              <h1>Review Privacy policy</h1>
            </TabsTrigger>
            {/* jobs */}
            <TabsTrigger
              value="job-privacy-policy"
              className="py-3 w-full bg-white border"
            >
              <h1> Jobs Privacy policy</h1>
            </TabsTrigger>

            {/* privace policy */}
            {/* <TabsTrigger
              value="job-privacy-policy"
              className="py-3 w-full bg-white border"
            >
              <h1>Privacy policy</h1>
            </TabsTrigger> */}
            {/* abotu aidroo */}
            <TabsTrigger
              value="about-aidroo"
              className="py-3 w-full bg-white border"
            >
              <h1>About aidroo</h1>
            </TabsTrigger>
          </TabsList>

          <div className="col-span-5 -mt-2 mb-8">
            <TermsAndConditions />
            <ReviewTermsContent />
            <JobsTermContent />
            <AboutTermsContent />
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}
