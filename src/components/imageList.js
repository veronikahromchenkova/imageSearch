import React from "react";
import ImageCard from "./imageCard";

const ImageList = props => {
  const images = props.foundImages.map((img, index) => {
    return <ImageCard key={index + "-" + img.id} image={img} />;
  });

  return (
    <div>
      <div className="imageList">{images}</div>
    </div>
  );
};

export default ImageList;
