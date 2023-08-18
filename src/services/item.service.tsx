// import { HttpStatusCode } from "axios";
import { HttpStatusCode } from "axios";
import { ApiClient } from "../utils/apiClient";
import ClientError from "../utils/clientError";
// import ClientError from "../utils/clientError";

export const createItem = async (body: Item) => {
  const res = await ApiClient.post("/item", body);
  return res.data;
};

export const getItem = async (itemId: string) => {
  const url: string = `/item/${itemId}`;
  const res = await ApiClient.get(url);
  if (res.status !== HttpStatusCode.Ok) {
    throw new ClientError("Item not found");
  }
  return res.data;
};

export const updateItem = async (itemId: Item, body: any) => {
  const res = await ApiClient.patch(`/item/${itemId}`, body);
  if (res.status !== HttpStatusCode.Ok) {
    throw new ClientError("Failed to update item");
  }
};
