import React from "react";
import { Collection } from "../../components/Collection";

export const Home = () => {
  return (
    <React.Fragment>
      <Collection short max={3} />
      <Collection />
    </React.Fragment>
  );
};
