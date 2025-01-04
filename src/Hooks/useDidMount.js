import { useEffect, useState } from "react";

const useDidMount = (initialState = false) => {
  const [didMount, setDidMount] = useState(initialState);

  useEffect(() => {
    setDidMount(true);

    return () => {
      setDidMount(false);
    };
  }, []);

  return didMount;
};

export default useDidMount;
