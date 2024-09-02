/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title" || "");
  const rating = parseInt(searchParams.get("rating" || 0));
  const profileUrl = searchParams.get("profileThumb" || "");
  const verified = searchParams.get("verified" || false);
  const totalReviews = searchParams.get("totalReviews" || 0);

  // Retrieve the color, 18, and filledStars parameters from the query string
  const color = searchParams.get("color") || "#0090ff"; // Default to blue if not provided
  // Default 18 if not provided
  const totalStars = 5;
  const filledStars = parseInt(searchParams.get("filledStars")) || 4;

  const sortedString = title.slice(0, 30);

  // Define the dynamic SVG path data for the star shape
  const dynamicPath = `M507.4,256.1c0,69.4-28.1,132.2-73.5,177.5c-45.3,45.5-108.3,73.7-177.5,73.7c-57.2,0-110.3-19.2-152.5-51.8
    c-0.2-0.2-0.4-0.2-0.7-0.5c-0.2,0-0.2-0.2-0.4-0.5c-0.2,0-0.4-0.2-0.7-0.5c-4.7-3.6-9.2-7.6-13.6-11.6c-4.2-3.8-8.3-7.8-12.3-11.8
    v-0.2c-0.2-0.2-0.2-0.2-0.4-0.2V430c-2.5-2.2-4.5-4.5-6.5-6.7c-0.2-0.2-0.4-0.5-0.7-0.7C29.3,378.5,5.4,320.2,5.4,256.1
    c0-69.2,28.1-131.9,73.5-177.5C124.2,33.3,187.2,5.2,256.4,5.2s132.2,28.1,177.5,73.4C479.2,124.2,507.4,186.9,507.4,256.1z`;

  // Define the inner white path that fits within the star
  const innerWhitePath = `M437.5,197.5l-138.3-0.3L256.3,65l-44.3,132.2H75.3l84.3,63c0,0,56.5-26.8,144-28.8c0,0,0,0-0.1,0.1
    c-3.4,1.2-102.2,37.3-144.2,99.6L145,410.7c0,0,0.2-0.4,0.7-1.1L253.7,329l114.6,81.7l-41.7-132.5L437.5,197.5z`;

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <img tw="flex w-32 border" src={profileUrl} alt="hello" />

        <div tw="flex   items-center justify-center">
          <span tw="text-2xl mr-2 ">{sortedString}</span>
          {verified ? (
            <img
              tw="w-5"
              src="https://res.cloudinary.com/dtwhrzfwy/image/upload/v1724249953/nackgugh5tinsynmfx89.jpg"
              alt="hello"
            />
          ) : (
            <img
              tw="w-4"
              src="https://res.cloudinary.com/dtwhrzfwy/image/upload/v1724249953/wav2s9ok4jmqiodxdtti.jpg"
              alt="hello"
            />
          )}
        </div>

        <span>{totalReviews === null ? totalReviews : 0} Reviews</span>
        <span tw="flex gap-4 items-center justify-center w-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${18 * totalStars}px`} // Adjust width to fit all stars
            height={`${18}px`} // Height of the SVG
            viewBox={`0 0 ${20 * totalStars} ${18}`} // Adjust viewBox to fit all stars
          >
            {[...Array(totalStars)].map((_, index) => {
              const starColor = index < filledStars ? color : "#e0e0e0";
              const x = index * 20; // Position each star horizontally

              return (
                <g key={index} transform={`translate(${x}, 0)`}>
                  <path
                    fill={starColor} // Apply the color using the fill attribute
                    d={dynamicPath} // Use the dynamic path data
                    transform={`scale(${18 / 512}) `} // Scale the path to the desired 18
                  />
                  <path
                    fill="#ffffff" // Apply white color for the inner path
                    d={innerWhitePath} // Use the inner white path data
                    transform={`scale(${18 / 512})`} // Scale the path to fit inside the star
                  />
                </g>
              );
            })}
          </svg>
          <span tw="text-xl">{rating}</span>
        </span>
      </div>
    ),
    {
      width: 1260,
      height: 600,
    }
  );
}
