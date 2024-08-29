"use client";
const Heading = ({ children, className, size = "md" }) => {
  const sizeClasses = {
    "2xl": "text-2xl md:text-3xl",
    xl: "text-xl md:text-2xl",
    lg: "text-lg md:text-xl",
    sm: "text-sm md:text-lg",
    xs: "text-sm md:text-lg",
  };

  return <h1 className={`${className} ${sizeClasses[size]}`}>{children}</h1>;
};

export default Heading;
