import React from "react";
import "../../styles/spinner.css";

export interface ModalProps {
  loading: boolean;
}

export const Modal = (props: ModalProps) => {
  const { loading } = props;

  return (
    loading && (
      <div className="h-[200px] w-full center">
        <svg className="spinner h-[60px] w-[60px]" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="white"
            strokeWidth="8"
          ></circle>
        </svg>
      </div>
    )
  );
};
