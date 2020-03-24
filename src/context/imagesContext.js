import React, { createContext, Component } from "react";

export const ImagesContext = createContext();

class ImagesContextProvider extends Component {
  state = {
    images: [],
    requests: 0,
    page: 2
  };
  setImages = newImages => {
    this.setState({
      images: newImages,
      requests: 0,
      page: 2
    });
  };
  appendImages = newImages => {
    this.setState({
      images: newImages,
      requests: this.state.requests + 1,
      page: this.state.page + 1
    });
  };
  render() {
    return (
      <ImagesContext.Provider
        value={{
          ...this.state,
          appendImages: this.appendImages,
          setImages: this.setImages
        }}
      >
        {this.props.children}
      </ImagesContext.Provider>
    );
  }
}

export default ImagesContextProvider;
