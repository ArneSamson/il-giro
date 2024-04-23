import React, { useEffect } from "react";

import useUIStore from "../../../../store/useUIStore";

export default function TextureIsLoading() {
  const { textureIsLoading } = useUIStore((state) => ({
    textureIsLoading: state.textureIsLoading,
  }));

  useEffect(() => {
    console.log(textureIsLoading);
  }, [textureIsLoading]);

  return (
    <>
      {textureIsLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "20%",
            transform: "translateX(-50%)",
            padding: "2rem",
            backgroundColor: "rgba(0,0,0,0.5)",
            margin: 0,
          }}
        >
          <p>Loading Textures</p>
        </div>
      )}
    </>
  );
}
