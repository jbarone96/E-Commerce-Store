import { useLayoutEffect } from "react";

const useDocument = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Reactify - React E-Commerce App";
    }
  }, [title]);
};

export default useDocument;
