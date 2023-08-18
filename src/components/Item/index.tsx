import { Image } from "../Image";

export interface ItemProps {
  id: string | undefined;
  item: Item | NewItem;
  height: number;
}

export const Item = (props: ItemProps) => {
  const { id, item, height } = props;

  const { title = undefined, image = undefined, details = undefined } = item;
  const gridTemplateRows: string = [title && "20px", image && "auto", "1fr"].join(" ");
  const imageHeight: string = details ? `${height * 0.7}px` : "100%";

  return (
    <div className={`relative card p-4 bg-white bg-opacity-25`} style={{ height: height, gridTemplateRows: gridTemplateRows }}>
      {title && <div>{title}</div>}
      {image && (
        <div style={{ maxHeight: imageHeight }}>
          <Image src={image} alt={id ? id : "image"} />
        </div>
      )}
      {details && <div>{details}</div>}
    </div>
  );
};
