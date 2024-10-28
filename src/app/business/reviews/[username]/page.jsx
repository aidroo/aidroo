import IconImage from "@/components/IconImage/IconImage";
import Layout from "@/components/Layout/Layout";
import Notfound from "@/components/Notfound";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Rating from "@/components/Rating/Rating";
import { Progress } from "@/components/ui/progress";
import { WriteReview2 } from "@/components/WriteReview/WriteReview2";
import { font14, font16, font18 } from "@/constant";
import { topplacementBadge } from "@/exportImage";
import {
  fetchProfiles,
  fetchSingleProfile,
} from "@/queries/admin-dashboard-getProfiles";
import { getBusinessProfileWithReviewsAndReactions } from "@/queries/reviews";
import Script from "next/script";
import BusinessProfileHeader from "../../_components/BusinessProfileHeader";
import BusinessProfileSidebar from "../../_components/BusinessProfileSidebar";
import ProfileNavbar from "../../_components/ProfileNavbar";
import SocialShare from "../../_components/SocialShare";
import ReviewCard from "./_components/ReviewCard";

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
      description,
      verified,
      averageRating,
    } = profile;

    const ratingLabel =
      averageRating < 3.5
        ? "Poor"
        : averageRating <= 4.5
        ? "Good"
        : "Excellent";

    const imageURL = `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/og?rating=${parseFloat(averageRating).toFixed(
      1 // Changed to 1 decimal to match industry standards
    )}&profileThumb=${encodeURIComponent(
      profileThumb
    )}&title=${encodeURIComponent(
      businessName.slice(0, 17)
    )}&verified=${verified}&totalReviews=${totalReviews}`;

    return {
      title: `${businessName} is Rated ${ratingLabel} `,
      description: { description },
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/business/${username}`,
      site_name: "Aidroo",

      keywords: ["aidroo", "business", businessName], // Added dynamic keyword generation
      openGraph: {
        type: "website", // Added type
        title: `${businessName} is Rated ${ratingLabel} `,
        description: `Based on ${totalReviews} reviews with an average rating of ${averageRating} out of 5.`,
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/business/${username}`,
        images: [
          {
            url: imageURL,
            width: 1200,
            height: 630,
            alt: `${businessName} profile image`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${businessName} is Rated ${ratingLabel} `,
        description: `Based on ${totalReviews} reviews with an average rating of ${averageRating} out of 5.`,
        image: profileThumb,
        image_alt: `${businessName} profile image`,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_API_BASE_URL}/business/${username}`,
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

export async function generateStaticParams() {
  try {
    // Assuming `fetchProfiles` can take a limit and return basic profile data
    const { businessProfiles } = await fetchProfiles({ limit: 100 }); // Adjust limit as needed

    // Return the static params based on profiles or categories (e.g., usernames)
    return businessProfiles.map((profile) => ({
      username: profile.username, // Assuming your routes are based on username
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BusinessLayout({ params, searchParams }) {
  const { username } = params;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const { reviews, totalRecords, totalPages, currentPage } =
    await getBusinessProfileWithReviewsAndReactions(username, page, limit);

  

  let profile;
  try {
    const response = await fetchSingleProfile({ username });
    profile = response.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    profile = null;
  }
  // Fetch data from the server-side function

  // json ld
  if (!profile) {
    return null;
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: profile.businessName || "Aidroo Business",
    description:
      profile.description ||
      "Aidroo offers top-notch business services, ensuring customer satisfaction and great value.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: profile.averageRating?.toString() || "0",
      bestRating: "5",
      worstRating: "1",
      reviewCount: profile.totalReviews?.toString() || "0",
    },
    url: `https://aidroo.com/business/reviews/${profile.username || "unknown"}`,
    logo: profile.profileThumb || "https://example.com/default-image.jpg",
  };
  // console.log(profile);
  return (
    <Layout>
      <Script
        id={`https://aidroo.com/business/#schema/${profile.username}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="w-full pb-14">
        <div className="w-full rounded-md dark:bg-dark">
          <div className="max-w-[1280px] mx-auto pb-10">
            <div className="w-full bg-[#f5fafc] dark:bg-dark">
              <div className="max-w-[1280px] mx-auto">
                <div className="grid w-full grid-cols-1 lg:grid-cols-5 gap-x-4 py-8 px-3 lg:px-10">
                  {profile && (
                    <BusinessProfileHeader
                      profile={profile}
                      totalReviews={profile.totalReviews}
                      averageRating={profile.averageRating}
                    />
                  )}
                  <SocialShare />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-14 lg:gap-10 bg-slate-50 px-2 lg:p-10 rounded-md mb-4">
              <div className="col-span-5 ">
                <ProfileNavbar
                  username={username}
                  businessName={profile?.businessName}
                />
                <div className="col-span-1 space-y-6">
                  {/* Write Review */}
                  <WriteReview2 profileId={username} />

                  {/* Overall Rating and Rating Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 rounded-md p-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <IconImage
                        src={topplacementBadge}
                        size={70}
                        alt="image"
                      />
                      <h1 className={`${font18}`}>Overall Rating</h1>
                      <div className="flex gap-1">
                        <Rating
                          value={Math.floor(profile?.averageRating)}
                          size={22}
                        />
                      </div>
                      <h1 className={`${font14}`}>
                        <span>{profile?.totalReviews}</span> Reviews
                      </h1>
                    </div>

                    {/* Rating Progress Bars */}
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].reverse().map((index) => {
                        // Define color mapping based on star rating
                        const getColorVariant = (index) => {
                          switch (index) {
                            case 5:
                              return "primary"; // Highest rating: Green
                            case 4:
                              return "success"; // High rating: Blue
                            case 3:
                              return "warning"; // Mid rating: Yellow
                            case 2:
                              return "secondary"; // Low rating: Gray
                            case 1:
                              return "danger"; // Lowest rating: Red
                            default:
                              return "primary"; // Default: Primary color
                          }
                        };

                        return (
                          <div key={index} className="flex gap-8 items-center">
                            <h1 className={`${font16}`}>{index} Stars</h1>
                            <Progress
                              value={(index / 5) * 100}
                              className="w-[60%]"
                              variant={getColorVariant(index)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Cards */}
                  {reviews?.length > 0 ? (
                    reviews?.map((review) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        username={username}
                      />
                    ))
                  ) : (
                    <Notfound />
                  )}

                  {10 < totalRecords && (
                    <PaginationComponent
                      currentPage={currentPage}
                      totalPages={totalPages}
                      baseUrl={`/business/reviews/${username}?`}
                    />
                  )}
                </div>
              </div>
              {profile && <BusinessProfileSidebar profile={profile} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
