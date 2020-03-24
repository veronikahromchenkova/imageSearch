import { useState } from "react";

function useSpans(imageRef) {
  const [spans, setSpans] = useState(0);

  const calculateSpans = () => {
    const height = imageRef.current.clientHeight;
    const spansRows = Math.ceil(height / 10);
    setSpans(spansRows);
  };

  return [spans, calculateSpans];
}

export default useSpans;
