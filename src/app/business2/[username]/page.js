import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { VscBriefcase } from "react-icons/vsc";
import BusinessProfileHeader from "./_components/BusinessProfileHeader";
import BusinessProfileSidebar from "./_components/BusinessProfileSidebar";
import JobsContent from "./_components/JobsContent";
import ReviewContent from "./_components/ReviewContent";

export async function generateMetadata({ params }) {
  const { username } = params;

  try {
    const { profile } = await fetchSingleProfile({ username });

    if (!profile) {
      return {
        title: "Profile Not Found",
        description: "The profile you are looking for does not exist.",
      };
    }

    const {
      businessName,
      profileThumb,
      totalReviews,
      verified,
      averageRating,
    } = profile;
    const ratingLabel =
      averageRating < 3.5
        ? "Poor"
        : averageRating <= 4.5
        ? "Good"
        : "Excellent";

    return {
      title: `${businessName} is rated ${ratingLabel}`,
      description: `Based on ${totalReviews} reviews with an average rating of ${averageRating} out of 5.`,
      url: `https://aidroo.com/${username}`,
      site_name: "Aidroo",
      openGraph: {
        title: `${businessName} is rated ${ratingLabel}`,
        description: `Based on ${totalReviews} reviews with an average rating of ${averageRating} out of 5.`,
        images: [
          {
            url: `${
              process.env.NEXT_PUBLIC_API_BASE_URL
            }/api/og?rating=${parseFloat(averageRating).toFixed(
              2
            )}&profileThumb=${encodeURIComponent(
              profileThumb
            )}&title=${encodeURIComponent(
              businessName.slice(0, 17)
            )}&verified=${verified}&totalReviews=${totalReviews}`,
            width: 1200,
            height: 630,
            alt: `${businessName} profile image`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${businessName} is rated ${ratingLabel}`,
        description: `Based on ${totalReviews} reviews with an average rating of ${averageRating} out of 5.`,
        image: profileThumb,
        image_alt: `${businessName} profile image`,
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      title: "Profile Not Found",
      description: "The profile you are looking for does not exist.",
    };
  }
}

export default async function Business({ params }) {
  const { username } = params;
  console.log(username);
  let profile;
  try {
    const response = await fetchSingleProfile({ username });
    profile = response.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    profile = null;
  }

  return (
    <section>
      <div className="w-full pb-14">
        <div className="w-full rounded-md dark:bg-dark">
          <div className="max-w-[1280px] mx-auto pb-10">
            <BusinessProfileHeader
              profile={profile}
              totalReviews={profile?.totalReviews}
              averageRating={profile?.averageRating}
            />

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-14 lg:gap-10 bg-slate-50 px-2 lg:p-10 rounded-md mb-4">
              <div className="col-span-5">
                {/* tabs */}

                <Tabs defaultValue="review" className="w-full">
                  <TabsList className="w-full  grid grid-cols-3 gap-4 h-16 px-4">
                    {/* review */}
                    <TabsTrigger value="review" className=" border h-12">
                      <FaRegStar className=" lg:text-[22px]" />
                      <span className=" text-sm mg:text-16">Reviews</span>
                    </TabsTrigger>
                    {/* jobs */}
                    <TabsTrigger value="job" className=" border h-12">
                      <VscBriefcase className="text-xl lg:text-2xl" />
                      <span>Jobs</span>
                    </TabsTrigger>
                    <TabsTrigger value="more" className=" border h-12">
                      <IoIosArrowDropright className="text-xl lg:text-2xl" />
                      <span>More</span>
                    </TabsTrigger>
                  </TabsList>
                  {/* Review content */}

                  <ReviewContent username={username} />
                  {/* jobs content */}
                  <JobsContent username={username} />
                </Tabs>
              </div>
              {profile && <BusinessProfileSidebar profile={profile} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
