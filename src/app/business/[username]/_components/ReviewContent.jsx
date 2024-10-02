import IconImage from "@/components/IconImage/IconImage";
import PaginationComponent from "@/components/Pagination/PaginationComponent";

import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import { WriteReview2 } from "@/components/WriteReview/WriteReview2";
import { font14, font16, font18 } from "@/constant";
import { topplacementBadge } from "@/exportImage";
import ReviewCard from "./ReviewCard";

// Review is a server component
export default async function ReviewContent({
  username,
  reviews,
  searchParams,
}) {
  const reviewLimit = parseInt(searchParams?.reviewLimit) || 10;
  const reviewWithReplies = reviews?.reviewsWithReplies;

  // // Job pagination
  // const jobPage = parseInt(searchParams?.jobPage) || 1;
  // const jobLimit = parseInt(searchParams?.jobLimit) || 10;

  // Fetch data from the server-side function

  return (
    <TabsContent value="review">
      <div className="col-span-1 space-y-6">
        {/* Write Review */}
        <WriteReview2 profileId={username} />

        {/* Overall Rating and Rating Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 rounded-md p-4">
          <div className="flex flex-col justify-center items-center space-y-2">
            <IconImage src={topplacementBadge} size={70} alt="image" />
            <h1 className={`${font18}`}>Overall Rating</h1>
            <div className="flex gap-1">
              {/* <Rating value={averageRating} size={18} /> */}
            </div>
            <h1 className={`${font14}`}>
              {/* <span>{totalReview}</span> Reviews */}
            </h1>
          </div>

          {/* Rating Progress Bars */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].reverse().map((index) => (
              <div key={index} className="flex gap-8 items-center">
                <h1 className={`${font16}`}>{index} Stars</h1>
                <Progress value={(index / 5) * 100} className="w-[60%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards */}
        {reviewWithReplies?.length > 0 &&
          reviewWithReplies.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

        {reviewLimit < reviews?.totalRecords && (
          <PaginationComponent
            currentPage={reviews?.currentPage}
            totalPages={reviews?.totalPages}
            baseUrl={`/business2/${username}?`}
          />
        )}
      </div>
    </TabsContent>
  );
}
