import React, { useState, useEffect, useContext } from "react";
import { getImages } from "../utils/functions";
import SearchBar from "./searchBar";
import ResultList from "./ResultList";
import { KeywordContext } from "../context/keywordContext";
import { ImagesContext } from "../context/imagesContext";

const ImageSearch = props => {
  const { keyword } = useContext(KeywordContext);
  const { setImages } = useContext(ImagesContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Image Search App");

  useEffect(() => {
    document.title = title;
  }, [title]);

  function searchImages(page = 1, per_page = 30) {
    setLoading(true);
    getImages(page, per_page, keyword).then(response => {
      setImages(response.results);
      setLoading(false);
      setTitle(keyword + " Pictures");
    });
  }

  return (
    <div>
      <SearchBar searchImages={searchImages} />
      <ResultList loading={loading} />
    </div>
  );
};

export default ImageSearch;
