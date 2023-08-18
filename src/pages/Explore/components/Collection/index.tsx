import { useEffect, useState } from "react";
import { getSurveys } from "../../../../services/survey.service";
import { createAggregation } from "../../../../utils/createAggregation";
import { Image } from "../../../../components/Image";
import { Link } from "react-router-dom";

export interface CollectionProps {
  search?: string;
  short?: boolean;
  group?: string;
  max?: number;
}

export const Collection = (props: CollectionProps) => {
  const { search, short = false, group = "any", max = 0 } = props;

  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const initializeSurveys = async () => {
      const pipeline = createAggregation(search, undefined, ["owner", "question", "cover", "code"], max);
      const requestedSurveys = await getSurveys(pipeline);
      setSurveys(requestedSurveys);
    };
    initializeSurveys();
  }, [max, search]);

  return (
    <div className="mb-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {surveys.length ? (
        surveys.map((survey) => {
          const { question, cover, code } = survey;
          const answerUrl: string = `/answer?code=${code}`;
          return (
            <Link
              id={String(code)}
              key={code}
              className="relative p-2 w-full button  "
              style={short ? { height: 60 } : { aspectRatio: "2/3" }}
              to={answerUrl}
            >
              <div className="absolute bottom-1 leading-5">
                <p className="text-[1.2rem]">{question}</p>
                <p className="text-[0.8rem]">{"Owner Name"}</p>
              </div>
              {cover && (
                <div className="absolute h-full w-full opacity-50 pointer-events-none">
                  <Image src={cover} alt="cover-image" />
                </div>
              )}
            </Link>
          );
        })
      ) : (
        <div>Unable to find requested surveys</div>
      )}
    </div>
  );
};
