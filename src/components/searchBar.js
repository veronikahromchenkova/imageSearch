import React from "react";
import { KeywordContext } from "../context/keywordContext";

const SearchBar = props => {
  function onFormSubmit(event) {
    event.preventDefault();
    props.searchImages();
  }
  return (
    <KeywordContext.Consumer>
      {keywordContext => {
        return (
          <div className="searchBlock">
            <h1>Search free photos from Unsplash</h1>
            <form onSubmit={onFormSubmit}>
              <input
                className="keywordInput"
                type="text"
                name="photo"
                autoComplete="off"
                placeholder="Search photos by a keyword"
                onChange={keywordContext.setKeyword}
              />
              <input className="submitBtn" type={"submit"} value={"Search"} />
            </form>
          </div>
        );
      }}
    </KeywordContext.Consumer>
  );
};

export default SearchBar;
