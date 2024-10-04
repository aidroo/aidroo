import IconImage from "@/components/IconImage/IconImage";
import PaginationComponent from "@/components/Pagination/PaginationComponent";

import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import { WriteReview2 } from "@/components/WriteReview/WriteReview2";
import { font14, font16, font18 } from "@/constant";
import { topplacementBadge } from "@/exportImage";
import ReviewCard from "./ReviewCard";
import { getBusinessProfileWithReviewsAndReactions } from "@/queries/reviews";
import Notfound from "@/components/Notfound";
import Rating from "@/components/Rating/Rating";

// Review is a server component
export default async function ReviewContent({
  username,
  page = 1,
  limit = 10,
  averageRating,
}) {
  const { reviews, totalRecords, totalPages, currentPage } =
    await getBusinessProfileWithReviewsAndReactions(username, page, limit);
  const rating = Math.floor(parseInt(averageRating));

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
              <Rating value={rating} size={18} />
            </div>
            <h1 className={`${font14}`}>
              <span>{totalRecords}</span> Reviews
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
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} username={username} />
          ))
        ) : (
          <Notfound />
        )}

        {10 < totalRecords && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/business/${username}?`}
          />
        )}
      </div>
    </TabsContent>
  );
}
