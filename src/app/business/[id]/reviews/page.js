"use client";
import Error from "@/components/Error";
import IconImage from "@/components/IconImage/IconImage";
import Loading from "@/components/Loading";
import Notfound from "@/components/Notfound";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Rating from "@/components/Rating/Rating";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import { Progress } from "@/components/ui/progress";
import WriteReview from "@/components/WriteReview/WriteReview";
import { font14, font16 } from "@/constant";
import { topplacementBadge } from "@/exportImage";
import { useAuth } from "@/hooks/useAuth";
import apiService from "@/lib/apiService";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function Review() {
  const [currentPage, setCurrentPage] = useState(1);

  const pathname = usePathname();
  const { currentUser } = useAuth();

  const username = pathname.split("/").filter(Boolean)[1];
  const itemsPerPage = 2;

  const fetcher = (url) => apiService.getData(url);
  const { data, error, mutate, isLoading } = useSWR(
    [
      "/api/review",
      {
        page: currentPage,
        limit: itemsPerPage,
        username: currentUser?.username,
        profileId: username,
      },
    ],
    fetcher
  );

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (error) {
    return <Error error={error.message} />;
  }

  // Handle not found state
  if (!data) {
    return <Notfound />;
  }

  return (
    <div className="col-span-1 space-y-6">
      {/* write review  */}
      <WriteReview
        mutate={mutate}
        username={currentUser?.username}
        profileId={username}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 rounded-md p-4">
        <div className="flex flex-col justify-center items-center space-y-2">
          <IconImage src={topplacementBadge} size={70} alt="image" />
          <h1 className={`${font16}`}>Overall Rating</h1>
          <div className="flex gap-1">
            <Rating value={4} size={18} />
          </div>
          <h1 className={`${font14}`}>
            <span>200</span> Reviews
          </h1>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].reverse().map((index) => (
            <div key={index} className="flex gap-8 items-center">
              <h1 className={`${font16}`}>{index} Stars</h1>
              <Progress value={index * 20} className="w-[60%] " />
            </div>
          ))}
        </div>
      </div>

      {/* reviews card */}

      {!isLoading &&
        !error & (data?.data?.length > 0) &&
        data?.data.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}

      <div>
        <PaginationComponent
          currentPage={data?.currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages}
        />
      </div>
    </div>
  );
}
