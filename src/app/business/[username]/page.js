/* eslint-disable @next/next/inline-script-id */
/* eslint-disable @next/next/no-script-component-in-head */
import Layout from "@/components/Layout/Layout";
import { Tabs } from "@/components/ui/tabs";
import {
  fetchProfiles,
  fetchSingleProfile,
} from "@/queries/admin-dashboard-getProfiles";
import { getAllProfileReviews } from "@/queries/reviews";
import Head from "next/head";
import Script from "next/script";
import { Suspense } from "react";
import BusinessNavbar from "./_components/BusinessNavbar";
import BusinessProfileHeader from "./_components/BusinessProfileHeader";
import BusinessProfileSidebar from "./_components/BusinessProfileSidebar";
import JobsContent from "./_components/JobsContent";
import Loading from "./_components/Loading";
import MoreContent from "./_components/MoreContent";
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

    const imageURL = `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/og?rating=${parseFloat(averageRating).toFixed(
      2
    )}&profileThumb=${encodeURIComponent(
      profileThumb
    )}&title=${encodeURIComponent(
      businessName.slice(0, 17)
    )}&verified=${verified}&totalReviews=${totalReviews}`;

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
            url: imageURL,
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

export default async function Business({ searchParams, params }) {
  const { username } = params;
  const limit = parseInt(searchParams?.reviewlimit) || 10;
  const page = parseInt(searchParams?.reviewpage) || 1;
  let profile;
  try {
    const response = await fetchSingleProfile({ username });
    profile = response.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    profile = null;
  }
  // Fetch data from the server-side function
  const {
    reviews,
    totalReview,
    rating,
    totalPages,
    currentPage,
    totalRecords,
  } = await getAllProfileReviews(username, page, limit);

  // json ld
  if (!profile) {
    profile = {
      businessName: "Default Business",
      profileThumb: "https://example.com/default-image.jpg",
      description: "No description available.",
      address: "Address not available",
      city: "City not available",
      state: "State not available",
      country: "Country not available",
      zipCode: "00000",
      averageRating: 0,
      totalReviews: 0,
      website: "",
    };
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization", // or "LocalBusiness" depending on your entity
    name: profile.businessName,
    image: profile.profileThumb || "https://example.com/default-image.jpg",
    description: profile.description || "No description available.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: profile.averageRating.toString() || "0",
      bestRating: "5",
      worstRating: "1",
      reviewCount: profile.totalReviews.toString() || "0",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: profile.address || "No address provided",
      addressLocality: profile.city || "City not provided",
      addressRegion: profile.state || "State not provided",
      postalCode: profile.zipCode || "00000",
      addressCountry: profile.country || "Country not provided",
    },
    sameAs: [
      "https://facebook.com/business-name", // Add social links dynamically
      "https://instagram.com/business-name",
      // Add other social profiles if available
    ],
    url: `https://aidroo.com/business/${profile?.username}`, // Profile URL
  };

  return (
    <Layout>
      <Head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

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
                  <BusinessNavbar />

                  <Suspense fallback={<Loading />}>
                    <ReviewContent
                      username={username}
                      reviews={reviews}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      baseUrl="/business/google"
                      totalReview={totalReview}
                      rating={rating}
                      totalRecords={totalRecords}
                    />
                  </Suspense>

                  <Suspense fallback={<Loading />}>
                    <JobsContent username={username} />
                  </Suspense>

                  <Suspense fallback={<Loading />}>
                    <MoreContent />
                  </Suspense>
                </Tabs>
              </div>
              {profile && <BusinessProfileSidebar profile={profile} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
