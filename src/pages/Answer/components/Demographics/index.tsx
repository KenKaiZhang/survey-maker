import { capitalize } from "../../../../utils/capitalize";

export interface DemographicProps {
  genders: string[];
  ages: string[];
}

export const Demographic = (props: DemographicProps) => {
  const { genders, ages } = props;

  return (
    <form className="card h-[550px] bg-white/25" style={{ gridTemplateRows: "25px min-content min-content" }}>
      <p>Complete to Submit Response</p>
      <div id="genders" className="pt-4 h-full w-full grid grid-cols-3 place-items-center">
        {genders.map((gender) => {
          return (
            <div key={gender}>
              <label className="button w-[45px] center rounded-[15px] border border-solid border-white">
                <input type="radio" name="gender" className="peer" value={gender} hidden />
                <div className="invisible h-[25px] w-[25px] border border-solid rounded-full border-white bg-black/60 peer-checked:visible"></div>
              </label>
              <p className="mt-2 text-center text-[0.8rem]">{capitalize(gender)}</p>
            </div>
          );
        })}
      </div>
      <div id="ages" className="relative mt-8 center">
        <div className="absolute h-[5px] w-[75%] bg-white/40" />
        <div className=" w-full grid grid-cols-5 ">
          {ages.map((age: string, index: number) => {
            return (
              <div key={age} className="relative">
                <label className="mx-auto h-[20px] w-[20px] center rounded-full bg-white cursor-pointer">
                  <input type="radio" name="age" id={age} value={index} required className="peer" hidden />
                  <div className="invisible h-[12px] w-[12px] rounded-full bg-black/80 peer-checked:visible"></div>
                </label>
                <p className="absolute mt-2 w-full text-center text-[0.8rem]">{age}</p>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};
