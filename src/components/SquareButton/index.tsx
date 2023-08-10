import React from "react";

export interface SquareButtonProps {
  id: string;
  inner: any;
  sideDim: number;
  onClick: any;
}

export const SquareButton = (props: SquareButtonProps) => {
  const { id, inner, sideDim, onClick } = props;

  return (
    <button id={id} className="button border-white border-solid" style={{ height: sideDim, width: sideDim }} onClick={onClick}>
      {inner}
    </button>
  );
};
