import Layout from "@/components/Layout/Layout";
import { font14 } from "@/constant";
import { fetchSingleProfile } from "@/queries/admin-dashboard-getProfiles";
import Head from "next/head";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineShare } from "react-icons/hi";
import { LiaSmsSolid } from "react-icons/lia";
import BusinessNavbar from "./_components/BusinessNavbar";
import BusinessProfileHeader from "./_components/BusinessProfileHeader";
import BusinessProfileSidebar from "./_components/BusinessProfileSidebar";
export async function generateMetadata({ params }) {
  const { username } = params;
  const { profile } = await fetchSingleProfile({ username });

  const { businessName, description, profileThumb } = profile;

  return {
    title: businessName,
    description: description,
    openGraph: {
      title: businessName,
      description: description,
      images: [
        {
          url: profileThumb,
          width: 1200,
          height: 630,
          alt: `${businessName}'s profile image`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: businessName,
      description: description,
      image: profileThumb,
    },
  };
}

export default async function BusinessProfileLayout({ children, params }) {
  const { username } = params;
  const metadata = await generateMetadata({ params });
  const { profile } = await fetchSingleProfile({ username });

  return (
    <Layout>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta
          property="og:image:width"
          content={metadata.openGraph.images[0].width}
        />
        <meta
          property="og:image:height"
          content={metadata.openGraph.images[0].height}
        />
        <meta
          property="og:image:alt"
          content={metadata.openGraph.images[0].alt}
        />
        <meta property="og:type" content={metadata.openGraph.type} />
        {/* Twitter Card */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </Head>
      <div className="w-full pb-14">
        <div className="w-full rounded-md dark:bg-dark">
          <div className="max-w-[1280px] mx-auto pb-10">
            {/*  */}
            <div className="w-full bg-[#f5fafc] dark:bg-dark">
              <div className="max-w-[1280px] mx-auto">
                <div className="grid w-full grid-cols-1 lg:grid-cols-5   gap-4 py-8  px-10">
                  {profile && <BusinessProfileHeader profile={profile} />}
                  <div className="lg:border-s border-primary_color items-center justify-center flex gap-2 lg:gap-4    col-span-2">
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
    </Layout>
  );
}
