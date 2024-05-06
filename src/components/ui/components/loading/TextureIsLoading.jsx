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
