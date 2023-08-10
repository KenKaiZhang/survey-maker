import { ApiClient } from "../utils/apiClient";

export const createItem = async (body: Item) => {
  const res = await ApiClient.post("/item", body);
  return res.data;
};
