import Layout from "@/components/Layout/Layout";
import ThumbSlider from "@/components/ThumbSlider/ThumbSlider";
import { Switch } from "@/components/ui/switch";
import { businessOur } from "@/constant";
import {
  fetchProfiles,
  fetchSingleProfile,
} from "@/queries/admin-dashboard-getProfiles";
import Script from "next/script";
import BusinessProfileHeader from "../../_components/BusinessProfileHeader";
import BusinessProfileSidebar from "../../_components/BusinessProfileSidebar";
import ProfileNavbar from "../../_components/ProfileNavbar";
import SocialShare from "../../_components/SocialShare";

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
      title: `${businessName} is ${ratingLabel} Rated`,
      description: { description },
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/business/${username}`,
      site_name: "Aidroo",

      keywords: ["aidroo", "business", businessName], // Added dynamic keyword generation
      openGraph: {
        type: "website", // Added type
        title: `${businessName} is ${ratingLabel} Rated`,
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
        title: `${businessName} is ${ratingLabel} Rated`,
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

export default async function BusinessLayout({ params,  }) {
  const { username } = params;
  
  
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
    url: `https://aidroo.com/business/${profile.username || "unknown"}`,
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
                <div>
                  {profile?.gallery?.length > 0 && (
                    <div className=" border-2 rounded-md p-10 mx-auto  ">
                      <ThumbSlider gallery={profile?.gallery} />
                    </div>
                  )}
                  {/* business Our */}
                  <h1 className="text-primary_color text-xl text-center pt-10 pb-2">
                    Business Our
                  </h1>
                  <div className="border-2 rounded-md ">
                    {businessOur.map((our) => (
                      <div
                        key={our.day}
                        className={`flex    place-content-center  justify-evenly p-4 font-light   `}
                      >
                        <h1 className="w-12">{our.day}</h1>
                        <div className="flex items-center space-x-2 w-24">
                          <Switch id={our.day} disabled={!our.open} />
                        </div>

                        <span className="">9.00 AM - 10.00 PM</span>
                      </div>
                    ))}
                  </div>
                  {/* map */}
                  {/* <div className="   h-[440px] w-full p-4 border-2 rounded-md">
        <GoogleMap showMarker={false} className="h-[400px] w-full rounded-md" />
      </div> */}
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
