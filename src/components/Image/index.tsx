import React from "react";

export interface ImageProps {
  src: any;
  alt: string;
  fitting?: string;
}

export const Image = (props: ImageProps) => {
  const { src, alt, fitting = "cover" } = props;

  return src && <img className=" h-full w-full rounded-[10px]" src={src} alt={alt} style={{ objectFit: fitting }} />;
};
