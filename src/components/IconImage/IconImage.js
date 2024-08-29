"use client";
import Image from "next/image";

const IconImage = ({ src, alt = "image", size = 50, className }) => {
  return (
    <div
      className="relative"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        className={`object-contain  ${className} shrink-0`}
      />
    </div>
  );
};

export default IconImage;
