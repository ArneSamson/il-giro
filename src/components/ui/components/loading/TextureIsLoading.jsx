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
            backgroundColor: "#ffffff89",
            borderRadius: "1rem",
            margin: 0,

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15%",
          }}
        >
          <div>
            <p>Loading Textures</p>
          </div>
          <div>
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
        </div>
      )}
    </>
  );
}
