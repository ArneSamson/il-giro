import React from "react";

import useUIStore from "../../../../store/useUIStore";

export default function TextureIsLoading() {
  const { textureIsLoading } = useUIStore((state) => ({
    textureIsLoading: state.textureIsLoading,
  }));

  return (
    <>
      {textureIsLoading && (
        <div className='loading-spinner'>
          <img
            src='/images/GIF/ilGiroLoading.gif'
            alt='loading'
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </>
  );
}
