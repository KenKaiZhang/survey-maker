import React, { useEffect, useState } from "react";
import { getSurveys } from "../../services/survey.service";
import ClientError from "../../utils/clientError";
import { Item } from "../../components/Item";
import { getItem, updateItem } from "../../services/item.service";
import { SquareButton } from "../../components/SquareButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faHeart, faUpload } from "@fortawesome/free-solid-svg-icons";
import { RoundProgress } from "../../components/RoundProgress";
import { Demographic } from "./components/Demographics";
import { createAggregation } from "../../utils/createAggregation";

export const Answer = () => {
  const [survey, setSurvey] = useState<Survey>();
  const [index, setIndex] = useState<number>(0);
  const [currItem, setCurrItem] = useState<Item | undefined>();
  const [answers, setAnswers] = useState<number[]>([]);
  const [lastItem, setLastItem] = useState<boolean>(false);

  useEffect(() => {
    const intializeSurvey = async () => {
      const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
      const surveyCode: string | null = urlParams.get("code");
      const pipeline = createAggregation({
        filters: { code: surveyCode },
        lookups: ["items"],
      });
      const targetSurvey: Survey = (await getSurveys(pipeline))[0];
      setSurvey(targetSurvey);
      setCurrItem(targetSurvey.items[0]);
    };
    intializeSurvey();
  }, []);

  useEffect(() => {
    if (survey) setCurrItem(survey.items[index]);
    if (index === survey?.items.length) setLastItem(true);
  }, [survey, index]);

  const handleButtonClick = (e: any) => {
    const id: string = e.target.id;
    if (answers.length === survey?.items.length) return;
    setAnswers((oldAns) => [...oldAns, Number(id === "like")]);
    setIndex(index + 1);
  };

  useEffect(() => console.log(lastItem), [lastItem]);

  const handleSubmit = () => {
    const form: HTMLFormElement = document.querySelector("form") as HTMLFormElement;
    const formData: FormData = new FormData(form);

    const gender: string = formData.get("gender");
    const age: string = formData.get("age");
    console.log(gender, age);

    // survey?.items.forEach((item: Item, index: number) => {
    //   const updateItemBody = {
    //     [`${gender}_responses`]: item[`${gender}`],
    //   };
    // });
  };

  return survey ? (
    <div className="absolute m-auto h-full w-full center">
      <div className="block">
        <div id="question" className="relative mb-2 text-[1.5rem] items-center grid gap-4" style={{ gridTemplateColumns: "1fr 30px" }}>
          {survey?.question}
          <RoundProgress radius={20} sqSize={30} strokeWidth={16} percentage={(index + 1) / survey?.items.length} />
        </div>
        <div id="item-slider center">
          {lastItem ? (
            <Demographic genders={["male", "female", "other"]} ages={["-17", "18-24", "25-44", "45-64", "65+"]} />
          ) : (
            <Item key={answers.length} id={String(index)} item={currItem} height={550} />
          )}
        </div>
        <div id="response-buttons" className="center mt-4 gap-8">
          {lastItem ? (
            <SquareButton
              id="submit"
              inner={<FontAwesomeIcon icon={faUpload} className="h-[45%] pointer-events-none" />}
              sideDim={60}
              onClick={handleSubmit}
            />
          ) : (
            <React.Fragment>
              <SquareButton
                id="like"
                inner={<FontAwesomeIcon icon={faHeart} className="h-[45%] pointer-events-none" />}
                sideDim={60}
                onClick={handleButtonClick}
              />
              <SquareButton
                id="dislike"
                inner={<FontAwesomeIcon icon={faBan} className="h-[45%] pointer-events-none" />}
                sideDim={60}
                onClick={handleButtonClick}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>Survey not found</div>
  );
};
