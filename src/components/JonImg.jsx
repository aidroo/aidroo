/* eslint-disable react/display-name */
import Lottie from "lottie-react";
import { memo, useEffect, useRef } from "react";
import f from "../asserts/jsonfile/Submitreview.json";
const JsonComponent = memo(({ animationData, shouldLoop }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      if (shouldLoop) {
        lottieRef.current.play(); // Play and loop the animation
      } else {
        lottieRef.current.goToAndStop(0); // Stop at the first frame
      }
    }
  }, [animationData]);

  return (
    <div className="w-52">
      <Lottie
        lottieRef={lottieRef}
        animationData={f}
        autoPlay={false} // Do not autoplay, control via ref
        loop={shouldLoop} // Control loop based on prop
      />
    </div>
  );
});

export default JsonComponent;

// Correct path to JSON file
