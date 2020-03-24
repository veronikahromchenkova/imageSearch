import { useContext, useEffect, useState } from "react";
import { ImagesContext } from "../context/imagesContext";
import { getImages } from "../utils/functions";
import { KeywordContext } from "../context/keywordContext";

function useImageAdding() {
  const { images, appendImages, requests, page } = useContext(ImagesContext);
  const [totalImages, setTotalImages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { keyword } = useContext(KeywordContext);
  const requestLimit = 2;

  useEffect(() => {
    setHasMore(true);
  }, [images]);

  function addImagesOnScroll() {
    if (requests < requestLimit) {
      getImages(page, 5, keyword).then(response => {
        setTotalImages(response.total);
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

  let endMessage =
    images.length !== totalImages
      ? "You have reached limit"
      : "You have seen it all";

  return [hasMore, endMessage, addImagesOnScroll];
}

export default useImageAdding;
