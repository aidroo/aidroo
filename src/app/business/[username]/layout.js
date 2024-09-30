import Layout from "@/components/Layout/Layout";
import {
  fetchProfiles,
  fetchSingleProfile,
} from "@/queries/admin-dashboard-getProfiles";

import BusinessNavbar from "./_components/BusinessNavbar";
import BusinessProfileHeader from "./_components/BusinessProfileHeader";
import BusinessProfileSidebar from "./_components/BusinessProfileSidebar";
import SocialShare from "./_components/SocialShare";

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

export async function generateStaticParams() {
  try {
    const { businessProfiles } = await fetchProfiles({ limit: 100 });
    return businessProfiles.slice(0, 20).map((profile) => ({
      username: profile.username,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProfileProfileLayout({ children, params }) {
  const { username } = params;

  const { profile } = await fetchSingleProfile({ username });

  // const jsonLdData = {
  //   "@context": "https://schema.org",
  //   "@type": "Organization",
  //   name: "businessname",
  //   url: "https://aidroo.com/business/mcscleaningservicesinc",
  //   logo: "",
  //   sameAs: [
  //     "https://www.instagram.com/aidroo_ig",
  //     "https://www.facebook.com/Fb.Aidroo",
  //   ],
  // };

  return (
    <Layout>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://aidroo.com",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-401-555-1212",
                  contactType: "customer service",
                },
              ],
            }),
          }}
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
