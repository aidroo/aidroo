"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100)); // Increment by 10 until 100
    }, 500);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Progress value={progress} variant="primary" size="xs" />
    </div>
  );
};

export default Loader;
