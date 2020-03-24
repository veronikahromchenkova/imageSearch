import React, { createContext, Component } from "react";

export const KeywordContext = createContext();

class KeywordContextProvider extends Component {
  state = {
    keyword: ""
  };
  setKeyword = e => {
    let newKeyword = e.target.value;
    this.setState({ keyword: newKeyword });
  };

  render() {
    return (
      <KeywordContext.Provider
        value={{
          ...this.state,
          setKeyword: this.setKeyword
        }}
      >
        {this.props.children}
      </KeywordContext.Provider>
    );
  }
}

export default KeywordContextProvider;
