import Layout from "@/components/Layout/Layout";
import { font14 } from "@/constant";
import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineShare } from "react-icons/hi";
import { LiaSmsSolid } from "react-icons/lia";
import BusinessNavbar from "./_components/BusinessNavbar";
import BusinessProfileHeader from "./_components/BusinessProfileHeader";
import BusinessProfileSidebar from "./_components/BusinessProfileSidebar";

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

export default async function ProfileProfileLayout({ children, params }) {
  const { username } = params;

  let profile;
  try {
    const response = await fetchSingleProfile({ username });
    profile = response.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    profile = null;
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness", // Replace with a more specific type if needed
    name: profile?.businessName || "Default Business Name",
    image:
      profile?.profileThumb ||
      " https://aidroo.com/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdtwhrzfwy%2Fimage%2Fupload%2Fv1726672084%2Fugl9w88ey9xy6psv1vyf.png&w=1920&q=75",
    description: profile?.description || "No description available.",
    address: {
      "@type": "PostalAddress",
      streetAddress: profile?.address || "Address not provided",
      addressLocality: profile?.city || "City not provided",
      addressRegion: profile?.state || "State not provided",
      postalCode: profile?.zipCode || "Zip Code not provided",
      addressCountry: profile?.country || "Country not provided",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: profile?.averageRating || 0, // Ensure this is a string
      bestRating: 5,
      worstRating: 1,
      reviewCount: profile?.totalReviews || 0, // Ensure this is a string
    },
    sameAs: profile?.website ? [profile.website] : [], // Profile's external websites
    url: `https://aidroo.com/business/${profile?.username}`, // Profile URL
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        id={`https://aidroo.com/business/${profile?.username}`}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <section>
        {" "}
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
                    <div className="lg:border-s mt-4 border-primary_color items-center justify-center flex gap-2 lg:gap-4 col-span-2">
                      <div className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2">
                        <LiaSmsSolid className="text-sm md:text-xl" />
                        <span className={font14}>Chat</span>
                      </div>
                      <div className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2">
                        <FaPlus className="text-sm" />
                        <span className={font14}>Follow</span>
                      </div>
                      <div className="bg-primary_color p-2 rounded-sm text-white flex items-center gap-2">
                        <HiOutlineShare className="text-sm md:text-xl" />
                        <span className={font14}>Share</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-7 gap-y-14 lg:gap-10 bg-slate-50 px-2 lg:p-10 rounded-md mb-4">
                <div className="col-span-5">
                  <BusinessNavbar />
                  {children}
                </div>
                {profile && <BusinessProfileSidebar profile={profile} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
