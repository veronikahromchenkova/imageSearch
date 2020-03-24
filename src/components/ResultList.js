import React, { useContext, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageList from "./imageList";
import Loader from "react-loader-spinner";
import { getImages } from "../utils/functions";
import { KeywordContext } from "../context/keywordContext";
import { ImagesContext } from "../context/imagesContext";

const ResultList = props => {
  const [totalImages, setTotalImages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { keyword } = useContext(KeywordContext);
  const { images, appendImages, requests, page } = useContext(ImagesContext);
  const requestLimit = 2;

  useEffect(() => {
    setHasMore(true);
  }, [images]);

  function addImagesOnScroll() {
    if (requests < requestLimit) {
      getImages(page, 5, keyword).then(response => {
        setTotalImages(response.total);
        console.log(response);
        if (images.length !== response.total) {
          let newImages = [...images, ...response.results];
          appendImages(newImages);
        } else {
          setHasMore(false);
        }
      });
    } else {
      setHasMore(false);
    }
  }

  let loader = props.loading ? (
    <Loader
      className="loader"
      type="ThreeDots"
      color="#333"
      height={80}
      width={80}
    />
  ) : (
    ""
  );
  let noResultText = images.length === 0 ? "No Results" : "";
  let endMessage =
    images.length !== totalImages
      ? "You have reached limit"
      : "You have seen it all";
  return (
    <div>
      <InfiniteScroll
        className="infiniteScroll"
        next={addImagesOnScroll}
        hasMore={hasMore}
        loader={loader}
        dataLength={images.length}
        endMessage={
          <p style={{ textAlign: "center", marginBottom: 40 }}>
            <b>{endMessage}</b>
          </p>
        }
      >
        <ImageList foundImages={images} />
      </InfiniteScroll>
      {noResultText}
    </div>
  );
};

export default ResultList;
