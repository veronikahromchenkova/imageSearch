import React from "react";
import Loader from "react-loader-spinner";

function useLoader(loading) {
  const loader = loading ? (
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

  return [loader];
}

export default useLoader;
