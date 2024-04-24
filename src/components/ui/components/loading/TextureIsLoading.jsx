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
      {!textureIsLoading && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: "25%",
            transform: "translateX(-50%)",
            margin: 0,
          }}
        >
          <img
            src='/images/GIF/spinner.gif'
            alt='loading'
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </>
  );
}
