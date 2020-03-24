import React, { useRef, useEffect } from "react";
import { downloadImage } from "../utils/functions";
import useSpans from "../hoooks/useSpans";

const ImageCard = props => {
  const imageRef = useRef();
  const [spans, calculateSpans] = useSpans(imageRef);

  useEffect(() => {
    imageRef.current.addEventListener("load", calculateSpans);
  });

  const downloadHandler = () => {
    downloadImage(props.image);
  };

  return (
    <div className="imageCard" style={{ gridRowEnd: `span ${spans}` }}>
      <img
        ref={imageRef}
        src={props.image.urls.small}
        alt={props.image.alt_description}
      />
      <div className="cardFooter">
        <a className="author" href={props.image.user.portfolio_url}>
          By {props.image.user.name}
        </a>
        <span className="downloadBtn" onClick={downloadHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.2 471.2">
            <path d="M457.7 230.15c-7.5 0-13.5 6-13.5 13.5v122.8c0 33.4-27.2 60.5-60.5 60.5H87.5c-33.4 0-60.5-27.2-60.5-60.5v-124.8c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v124.8c0 48.3 39.3 87.5 87.5 87.5h296.2c48.3 0 87.5-39.3 87.5-87.5v-122.8c0-7.4-6-13.5-13.5-13.5z" />
            <path d="M226.1 346.75c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4l85.8-85.8c5.3-5.3 5.3-13.8 0-19.1-5.3-5.3-13.8-5.3-19.1 0l-62.7 62.8V30.75c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v273.9l-62.8-62.8c-5.3-5.3-13.8-5.3-19.1 0-5.3 5.3-5.3 13.8 0 19.1l85.9 85.8z" />
          </svg>
        </span>
      </div>
      <div className="cover"></div>
    </div>
  );
};

export default ImageCard;
