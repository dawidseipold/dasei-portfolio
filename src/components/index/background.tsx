import Spline from "@splinetool/react-spline";
import { useEffect, useState } from "react";
import React from "react";

const Background = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Spline
        className="absolute top-0 left-0 z-10"
        scene="https://prod.spline.design/k9Dp28P1yebzFvs2/scene.splinecode"
        onLoad={() => setLoading(false)}
      />

      {loading && (
        <img
          className="absolute top-0 left-0 z-0 w-screen h-screen object-cover"
          src="/background.png"
          alt="background"
        />
      )}
    </>
  );
};

export default Background;
