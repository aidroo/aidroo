import IconImage from "@/components/IconImage/IconImage";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import Rating from "@/components/Rating/Rating";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import { Progress } from "@/components/ui/progress";
import WriteReview from "@/components/WriteReview/WriteReview";
import { font14, font16 } from "@/constant";
import { topplacementBadge } from "@/exportImage";
import { getAllProfileReviews } from "@/queries/reviews";

// Review is a server component
export default async function Review({ params: { id }, searchParams }) {
  const limit = parseInt(searchParams.limit) || 10;
  const page = parseInt(searchParams?.page) || 1;
  // Fetch data from the server-side function
  const {
    reviews,
    totalReview,
    rating,
    totalPages,
    currentPage,
    totalRecords,
  } = await getAllProfileReviews(id, page, limit);
  const averageRating = Math.round(rating);
  const baseUrl = `/business/${id}/reviews`;
  return (
    <div className="col-span-1 space-y-6">
      {/* Write Review */}
      <WriteReview profileId={id} />

      {/* Overall Rating and Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 rounded-md p-4">
        <div className="flex flex-col justify-center items-center space-y-2">
          <IconImage src={topplacementBadge} size={70} alt="image" />
          <h1 className={`${font16}`}>Overall Rating</h1>
          <div className="flex gap-1">
            <Rating value={averageRating} size={18} />
          </div>
          <h1 className={`${font14}`}>
            <span>{totalReview}</span> Reviews
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
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      ) : (
        <p>No reviews found.</p>
      )}

      {limit < totalRecords && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
        />
      )}
    </div>
  );
}
