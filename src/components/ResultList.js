import React, { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageList from "./imageList";
import { ImagesContext } from "../context/imagesContext";
import useLoader from "../hoooks/useLoader";
import useImageAdding from "../hoooks/useImageAdding";

const ResultList = props => {
  const { images } = useContext(ImagesContext);
  const [loader] = useLoader(props.loading);
  const [hasMore, endMessage, addImagesOnScroll] = useImageAdding();

  let noResultText = images.length === 0 ? "No Results" : "";

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
        <ImageList />
      </InfiniteScroll>
      {noResultText}
    </div>
  );
};

export default ResultList;
