import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../../components/Item";
import { ItemEditor } from "./components/ItemEditor";
import { fileToDataUrl } from "../../utils/fileToDataUrl";
import { SquareButton } from "../../components/SquareButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faRefresh, faUpload } from "@fortawesome/free-solid-svg-icons";
import { SideBar } from "./components/Sidebar";
import { useToggle } from "../../hooks/useToggle";
import { createOfficialItems } from "./utils/createOfficialItem";
import { getPresignedDatas, uploadToS3 } from "../../services/s3.service";
import { createItem } from "../../services/item.service";
import { createSurvey, updateSurvey } from "../../services/survey.service";

export const Create = () => {
  const [resetKey, setResetKey] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [item, setItem] = useState<NewItem>({
    id: uuidv4(),
    title: undefined,
    image: undefined,
    details: undefined,
  });
  const [savedItems, setSavedItems] = useState<NewItem[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [sideOpen, toggle] = useToggle(false);

  const handleItemChange = (e: any) => {
    const event = e.target;

    const eventId = event.id;

    if (eventId === "item-title") {
      const updatedItem = {
        ...item,
        title: event.value,
      };
      setItem(updatedItem);
    } else if (eventId === "item-image") {
      fileToDataUrl(e.target.files[0], (dataUrl: any) => {
        const updatedItem = {
          ...item,
          image: dataUrl,
        };
        setItem(updatedItem);
      });
    } else {
      const updatedItem = {
        ...item,
        details: event.value,
      };
      setItem(updatedItem);
    }
  };

  const handleQuestChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const handleItemSave = () => {
    if (!item.title && !item.image && !item.details) return;
    if (editMode) {
      const index: number = savedItems.findIndex((savedItem) => savedItem.id === item.id);
      const updatedItems: NewItem[] = [...savedItems.slice(0, index), item, ...savedItems.slice(index + 1)];
      setSavedItems(updatedItems);
      setEditMode(false);
    } else {
      const updatedItems = [...savedItems];
      updatedItems.push(item);
      setSavedItems(updatedItems);
    }
    setItem({ id: uuidv4(), title: undefined, image: undefined, details: undefined });
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleEditItem = (e: any) => {
    setEditMode(true);
    const targetId: string = e.target.id;
    const targetItem: NewItem = savedItems[savedItems.findIndex((item) => item.id === targetId)];
    setItem(targetItem);
  };

  const handleSurveyReset = () => {
    setQuestion("");
    setSavedItems([]);
  };

  const handleSurveySubmit = async () => {
    // Get a presignedUrl for items with images
    const officialSurvey: Survey = await createSurvey({ question: question });

    // Get list of items (ids) that have images
    const keysWithImg: string[] = [];
    for (let i = 0; i < savedItems.length; i++) {
      if (savedItems[i].image) keysWithImg.push(savedItems[i].id);
    }

    // Get presigned data to allow S3 upload (organized by item id)
    const presignedDatas = keysWithImg.length > 0 ? await getPresignedDatas(keysWithImg) : undefined;

    // Make a list of Item from the list of locally saved items
    const officialItems: Item[] = await Promise.all(
      savedItems.map(async (item: NewItem) => {
        // Only perform upload if the item has a presigned data associated with it
        if (presignedDatas && presignedDatas[item.id]) {
          console.log("UPLOADING IMAGE");
          item.image = await uploadToS3(presignedDatas[item.id], item.image);
        }
        return createItem(createOfficialItems(officialSurvey, item));
      })
    );

    await updateSurvey(officialSurvey, { items: officialItems });
    handleSurveyReset();
  };

  return (
    <div className="center w-[100vw] h-[100vh] bg-gradient-to-b from-indigo-500 to-red-500">
      <SideBar items={savedItems} setItems={setSavedItems} open={sideOpen} editHandler={handleEditItem} />
      <div className="absolute left-8 z-20 duration-[0.75s]" style={{ left: sideOpen ? "36%" : "2rem" }}>
        <SquareButton
          id="open-sidebar"
          inner={<FontAwesomeIcon icon={faChevronRight} className="duration-[0.75s]" style={{ transform: sideOpen ? "rotate(180deg)" : "" }} />}
          sideDim={45}
          onClick={toggle}
        />
      </div>

      <div className="h-full w-ful center duration-[0.5s]" style={sideOpen ? { opacity: "25%", pointerEvents: "none" } : {}}>
        <div id="prev-item-view" className="mt-8 h-[400px] aspect-2/3 opacity-70">
          {savedItems.length > 0 && <Item key={resetKey} id={"prevItem"} item={savedItems[savedItems.length - 1]} height={400} />}
        </div>

        <div id="item-editor" className="mx-8">
          <input type="text" className="mb-4 text-2" onChange={handleQuestChange} placeholder="Survey Question" value={question} />
          <ItemEditor key={resetKey} item={item} onChange={handleItemChange} />
        </div>

        <button id="new-item-button" className="relative card mt-8 h-[400px] button opacity-70" onClick={handleItemSave}>
          <div className="absolute w-full m-auto top-1/2 -translate-y-1/2 text-center text-1.5 font-bold">{editMode ? "Save Edit" : "New Item"}</div>
        </button>
      </div>

      <div className="absolute right-8 grid grid-rows-2 gap-4">
        <SquareButton id="submit-survey" inner={<FontAwesomeIcon icon={faUpload} />} sideDim={45} onClick={handleSurveySubmit} />
        <SquareButton id="reset-survey" inner={<FontAwesomeIcon icon={faRefresh} />} sideDim={45} onClick={handleSurveyReset} />
      </div>
    </div>
  );
};
