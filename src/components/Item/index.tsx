import React, { useEffect, useState } from "react";
import { Image } from "../Image";

export interface ItemProps {
  id: string | undefined;
  item: SurveyItem | NewItem;
  height: number;
}

export const Item = (props: ItemProps) => {
  const { id, item, height } = props;
  const imageHeight: string = item.details ? `${height * 0.7}px` : "100%";

  return (
    <div className={`survey-item relative card p-4 h-full bg-white bg-opacity-25`}>
      <div>{item.title}</div>
      <div className="center" style={{ maxHeight: `${imageHeight}` }}>
        <Image src={item.image} alt={id ? id : "image"} />
      </div>
      <div>{item.details}</div>
    </div>
  );
};
