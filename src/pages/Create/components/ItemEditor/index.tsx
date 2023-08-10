import React, { useState } from "react";
import { Image } from "../../../../components/Image";
import { fileToDataUrl } from "../../../../utils/fileToDataUrl";
import { Modal } from "../../../../components/Modal";
import { useToggle } from "../../../../hooks/useToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export interface ItemEditorProps {
  item: NewItem;
  onChange: any;
}

export const ItemEditor = (props: ItemEditorProps) => {
  const { item, onChange } = props;
  const [image, setImage] = useState<any>();
  const [loading, toggle] = useToggle();

  var initTitle = item && item.title ? item.title : "";
  var initImage = item && item.image ? item.image : "";
  var initDetails = item && item.details ? item.details : "";

  const handleChange = (e: any) => {
    if (e.target.files.length !== 0) {
      setImage(undefined);
      toggle();
      fileToDataUrl(e.target.files[0], (dataUrl: any) => {
        setImage(dataUrl);
        toggle();
      });
      onChange(e);
    }
  };

  return (
    <div className="card p-4 h-[600px] bg-white/25">
      <input id="item-title" className="placeholder-white" type="text" placeholder="Title" onChange={onChange} value={initTitle} />

      <div className={`relative inline-flex flex-col h-auto`}>
        <Modal loading={loading} />

        <input id="item-image" className="hidden" type="file" onChange={handleChange} />
        {image || initImage ? (
          <div className="center w-full max-h-[420px]">
            <Image src={initImage} alt={"new item image"} />
            <label htmlFor="item-image" className="absolute h-full w-full center button opacity-0 hover:opacity-100">
              <FontAwesomeIcon className="h-1/5" icon={faImage} />
            </label>
          </div>
        ) : (
          <label htmlFor="item-image" className="button center">
            {"Add Image"}
          </label>
        )}
      </div>

      <textarea
        id="item-details"
        className="placeholder-white h-full resize-none overflow-hidden"
        placeholder="Details"
        onChange={onChange}
        value={initDetails}
      />
    </div>
  );
};
