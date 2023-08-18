import { HttpStatusCode } from "axios";
import { ApiClient } from "../utils/apiClient";
import ClientError from "../utils/clientError";

export const createSurvey = async (body: NewSurvey) => {
  const res = await ApiClient.post("/survey", body);
  if (res.status !== HttpStatusCode.Created) {
    throw new ClientError("Failed to create a new survey");
  }
  return res.data;
};

export const updateSurvey = async (survey: Survey, body: any) => {
  const res = await ApiClient.patch(`/survey/code/${survey.code}`, body);
  if (res.status !== HttpStatusCode.Ok) {
    throw new ClientError("Failed to update survey");
  }
};

export const getSurvey = async (code: string) => {
  const url = `/survey/code/${code}`;
  const res = await ApiClient.get(url);
  if (res.status !== HttpStatusCode.Ok) {
    throw new ClientError("Failed to retrieve surveys");
  }
  return res.data;
};

export const getSurveys = async (pipeline: any) => {
  const res = await ApiClient.post("/survey/filter", pipeline);
  if (res.status !== HttpStatusCode.Ok) {
    throw new ClientError("Issue retrieving surveys");
  }
  return res.data;
};
