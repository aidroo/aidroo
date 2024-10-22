 
import { profilePic } from "@/exportImage";
import ResponsiveImage from "./ResponsiveImage/ResponsiveImage";
 

 
export default function Avatar({
  className = "rounded-full",
  width = "60px",
  height = "60px",
  src,
  alt = "Profile icon",
}) {
  return (
    <ResponsiveImage
      src={src || profilePic}
      alt={alt}
      width={width}
      height={height}
      priority={true}
      className={`${className} rounded-full`}
    />
  );
}
