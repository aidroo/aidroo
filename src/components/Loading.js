import loaderImage from "@/public/images/loaderaidroo.gif";
import IconImage from "./IconImage/IconImage";
export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <IconImage src={loaderImage} size={130} />
    </div>
  );
}
