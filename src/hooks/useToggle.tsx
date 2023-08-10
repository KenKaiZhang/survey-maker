import { useState } from "react";

export const useToggle = (init: boolean = false) => {
  const [value, setValue] = useState(init);

  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  return [value, toggle];
};
