import React, { useState } from "react";
import { Searchbar } from "../../components/Searchbar";
import { Collection } from "../../components/Collection";
import { SquareButton } from "../../../../components/SquareButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal, faList } from "@fortawesome/free-solid-svg-icons";

export const Search = () => {
  const [enteredSearch, setEnteredSearch] = useState<string | undefined>();
  const [short, setShort] = useState<boolean>(false);

  const handleModeClick = (e: any) => {
    if (e.target.id === "list-mode") setShort(true);
    else setShort(false);
  };

  const handleSearchbarEnter = async (e: any) => {
    setEnteredSearch(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="relative mb-4 flex z-50">
        <div className="h-[45px] w-[50%]">
          <Searchbar onEnter={handleSearchbarEnter} />
        </div>
        <div className="absolute right-0 flex gap-4">
          <SquareButton id="list-mode" inner={<FontAwesomeIcon className="pointer-events-none" icon={faList} />} onClick={handleModeClick} />
          <SquareButton
            id="grid-mode"
            inner={<FontAwesomeIcon className="pointer-events-none" icon={faGripHorizontal} />}
            onClick={handleModeClick}
          />
        </div>
      </div>
      <div>{enteredSearch && <Collection key={enteredSearch} search={enteredSearch} short={short} />}</div>
    </React.Fragment>
  );
};
