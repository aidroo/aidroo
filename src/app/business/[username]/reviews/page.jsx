import IconImage from "@/components/IconImage/IconImage";
import Notfound from "@/components/Notfound";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Rating from "@/components/Rating/Rating";
import { Progress } from "@/components/ui/progress";
import { WriteReview2 } from "@/components/WriteReview/WriteReview2";
import { font14, font16, font18 } from "@/constant";
import { topplacementBadge } from "@/exportImage";
import { getBusinessProfileWithReviewsAndReactions } from "@/queries/reviews";
import ReviewCard from "../_components/ReviewCard";

export default async function page({ params, searchParams }) {
  const { username } = params;
  const limit = parseInt(searchParams?.limit) || 10;
  const page = parseInt(searchParams?.page) || 1;
  const { reviews, totalRecords, totalPages, currentPage } =
    await getBusinessProfileWithReviewsAndReactions(username, page, limit);
  //   const rating = Math.floor(parseInt(averageRating));
  return (
    <div className="col-span-1 space-y-6">
      {/* Write Review */}
      <WriteReview2 profileId={username} />

      {/* Overall Rating and Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 rounded-md p-4">
        <div className="flex flex-col justify-center items-center space-y-2">
          <IconImage src={topplacementBadge} size={70} alt="image" />
          <h1 className={`${font18}`}>Overall Rating</h1>
          <div className="flex gap-1">
            <Rating value={3} size={18} />
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
          baseUrl={`/business/${username}/reviews?`}
        />
      )}
    </div>
  );
}
