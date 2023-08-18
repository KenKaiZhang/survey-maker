type NewItem = {
  id: string;
  title?: string;
  image?: any;
  details?: string;
};

type NewSurvey = {
  question: string;
};

type AggregationProps = {
  search?: string;
  filters?: any;
  fields?: string[];
  lookups?: string[];
  limit?: number;
};
