import React, { useEffect, useState } from "react";
import { createAggregation } from "../../../../utils/createAggregation";
import { getSurveys } from "../../../../services/survey.service";
import { Link } from "react-router-dom";

export interface SearchbarProps {
  onEnter: any;
}

export const Searchbar = (props: SearchbarProps) => {
  const { onEnter } = props;

  const [search, setSearch] = useState<string | undefined>();
  const [autocomplete, setAutocomplete] = useState<Survey[] | undefined>();

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter") {
      onEnter(e).then(() => {
        setAutocomplete(undefined);
        e.target.value = "";
      });
    }
  };

  useEffect(() => {
    const getAutoComplete = async () => {
      const pipeline = createAggregation(search, undefined, ["owner", "question", "code"], 10);
      const possibleSurveys: Survey[] = await getSurveys(pipeline);
      setAutocomplete(possibleSurveys.length > 0 ? possibleSurveys : undefined);
    };
    if (search) getAutoComplete();
  }, [search]);

  return (
    <React.Fragment>
      <input
        className="p-4 h-full w-full border border-white border-solid bg-white/25 rounded-[10px] focus:bg-black/25"
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        placeholder={"Search survey..."}
      />
      {autocomplete && (
        <div className=" mt-4 p-4 w-full grid gap-4 rounded-[10px] backdrop-blur-md bg-black/25 duration-[0.5s]">
          {autocomplete.map((res: any) => {
            const { question, code } = res;
            const answerUrl = `/answer?code=${code}`;
            return (
              <Link key={code} className="relative pl-4 w-full h-[45px] button bg-transparent" to={answerUrl}>
                <div>{question}</div>
                <div className="italic text-[0.9rem]">{"Owner Name"}</div>
                <div className="absolute top-2 right-4 text-[0.9rem] opacity-25">{code}</div>
              </Link>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};
