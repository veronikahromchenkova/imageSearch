import React from "react";
import ImageSearch from "../../components/imageSearch";
import KeywordContextProvider from "../../context/keywordContext";
import ImagesContextProvider from "../../context/imagesContext";

function App() {
  return (
    <div className="App">
      <KeywordContextProvider>
        <ImagesContextProvider>
          <ImageSearch />
        </ImagesContextProvider>
      </KeywordContextProvider>
    </div>
  );
}

export default App;
