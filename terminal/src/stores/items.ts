import axios from "axios";
import { env } from "../env";
import { ReturnType } from "../models/returnType";

const baseUrl = `${env.API_URL}/api`;

const instance = axios.create({
  withCredentials: true,
});

export async function getAllItems(): Promise<ReturnType> {
  return await instance({
    method: "get",
    url: `${baseUrl}/item/all`,
    withCredentials: true,
  })
    .then((response) => {
      console.log(response.status);
      return new ReturnType("ok", response.data);
    })
    .catch((error) => {
      return new ReturnType("error", error);
    });
}