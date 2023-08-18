import React from "react";

export interface SquareButtonProps {
  id: string;
  inner: any;
  sideDim?: number;
  onClick: any;
}

export const SquareButton = (props: SquareButtonProps) => {
  const { id, inner, sideDim = 45, onClick } = props;

  return (
    <button id={id} className="center button border-2 border-white border-solid" style={{ height: sideDim, width: sideDim }} onClick={onClick}>
      {inner}
    </button>
  );
};
