"use client";
import { useState } from "react";
import Star from "../Star/Star";

const Rating = ({ isEditable = false, value, size, rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Update the rating state
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index); // Update the hover rating state
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const getColorClass = (index) => {
    const currentRating = isEditable ? hoverRating || rating : value;
    if (index <= currentRating) {
      switch (currentRating) {
        case 1:
          return "red";
        case 2:
        case 3:
          return "yellow";
        case 4:
          return "green";
        case 5:
          return "blue";
        default:
          return "initial";
      }
    } else {
      return "initial";
    }
  };

  return (
    <>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          colorClass={getColorClass(index)}
          onClick={handleRatingChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          index={index}
          isEditable={isEditable}
          size={size}
        />
      ))}
    </>
  );
};

export default Rating;
