import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { ApiClient } from "../utils/apiClient";
import { dataUrlToBinary } from "../utils/imageTools";
import ClientError from "../utils/clientError";

// Calls api to get a presigned url for image to be saved in S3
export const getPresignedDatas = async (keys: string[]) => {
  const res: AxiosResponse = await ApiClient.post("/s3", keys);
  return res.data;
};

// Use presigned data to set up request to upload image
export const uploadToS3 = async (presignedData: any, image: any) => {
  const { url, fields } = presignedData;

  // Store presigned data in FormData
  const formData: FormData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  formData.append("file", dataUrlToBinary(image));

  // Send a post request
  const res: AxiosResponse = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // Location is stored in a XML Response in res.data
  if (res.status === HttpStatusCode.Created) {
    const parser: DOMParser = new DOMParser();
    const xmlDoc: Document = parser.parseFromString(res.data, "text/xml");
    return xmlDoc.querySelector("Location")?.textContent;
  } else {
    throw new ClientError("Failed to upload image");
  }
};
