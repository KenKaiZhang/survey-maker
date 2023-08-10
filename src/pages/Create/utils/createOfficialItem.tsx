export const createOfficialItems = (survey: Survey, item: NewItem) => {
  const officialItem: Item = {};
  officialItem.survey = survey;

  if (item.title) officialItem.title = item.title;
  if (item.image) officialItem.image = item.image;
  if (item.details) officialItem.details = item.details;

  return officialItem;
};
