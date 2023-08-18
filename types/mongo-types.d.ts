type User = {
  name: string;
  email: string;
  password: string;
  profile_img?: string;
  surveys: Survey[] | [];
  gender: string;
  age: number;
};

type Survey = {
  _id: string;
  code: number;
  owner: any;
  cover?: string;
  question: string;
  items: Item[];
  date_created: Date;
  public: boolean;
  responses: number;
  allowed: any;
};

type Item = {
  title?: string;
  image?: string;
  details?: string;
  male_responses?: number[];
  female_responses?: number[];
  other_responses?: number[];
  age_yes?: number;
  age_no?: number;
  survey?: any;
};
