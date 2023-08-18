export const createAggregation = (parameters: AggregationProps) => {
  const aggregationPipeline = [];
  const { search, filters, fields, lookups, limit } = parameters;

  if (search) {
    aggregationPipeline.push({ $search: { index: "default", autocomplete: { query: search, path: "question" } } });
  }

  if (filters) {
    aggregationPipeline.push({ $match: filters });
  }

  // Includes only fields listed in here
  if (fields) {
    const project: { [key: string]: any } = fields.reduce((object, field) => {
      object[field] = 1;
      return object;
    }, {});
    aggregationPipeline.push({ $project: project });
  }

  if (lookups) {
    lookups.forEach((lookup: string) => {
      aggregationPipeline.push({ $lookup: { from: lookup, localField: lookup, foreignField: "_id", as: lookup } });
    });
  }

  if (limit) {
    aggregationPipeline.push({ $limit: limit });
  }

  return aggregationPipeline;
};
