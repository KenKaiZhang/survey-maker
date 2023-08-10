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
