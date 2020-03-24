import React, { useContext } from "react";
import ImageCard from "./imageCard";
import { ImagesContext } from "../context/imagesContext";

const ImageList = props => {
  const { images } = useContext(ImagesContext);

  const listOfImages = images.map((img, index) => {
    return <ImageCard key={index + "-" + img.id} image={img} />;
  });

  return (
    <div>
      <div className="imageList">{listOfImages}</div>
    </div>
  );
};

export default ImageList;
