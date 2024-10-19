import Image from "next/image";

const ResponsiveImage = ({
  src,
  alt = "image",
  layout = "responsive",
  objectFit = "cover",
  ...rest
}) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        className="w-full h-full object-cover"
        {...rest}
        width={500}
        height={300}
      />
    </div>
  );
};

export default ResponsiveImage;
