import Image from "next/image";
 

export default function ImageComponent({
  src,
  alt,
  
  width = "100%",  // default parent width
  height,          // optional parent height, calculated if not provided
  objectFit = "cover", 
  className  // default object fit
}) {
  // Calculate padding-bottom for aspect ratio if no fixed height is provided
  
  

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width,          // Parent div width
        height: height || "auto", // Parent div height or auto (based on aspect ratio)
          // Use padding-bottom if height is not set
      }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"          // Image fills the parent div
        objectFit={objectFit}  // Image fit within the parent (cover, contain, etc.)
        className="absolute top-0 left-0 w-full h-full"
        priority               // Optional: For optimizing loading
      />
    </div>
  );
}
