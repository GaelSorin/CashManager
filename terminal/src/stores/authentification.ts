import { env } from "../env";
import axios from "axios";
import { ReturnType } from "../models/returnType";

const baseUrl =  `${env.API_URL}/api`;

const instance = axios.create({
    withCredentials: true,
});

export async function login(email:string, password:string): Promise<ReturnType> {
    return await instance({
        method: "post",
        url: `${baseUrl}/auth/login`,
        data: {
          email,
          password,
        },
        withCredentials: true,
    })
        .then((response) => {
          console.log(response.status);
          return new ReturnType("ok", response.data);
        })
        .catch((error) => {
          console.log(baseUrl);
          console.log("test");
          console.log(error);
          return new ReturnType("error", error);
        });
}

export async function logout(): Promise<ReturnType> {
  return await instance({
    method: "post",
    url: `${baseUrl}/auth/logout`,
    withCredentials: true,
  })
    .then((response) => {
      return new ReturnType("ok", response.data);
    })
    .catch((error) => {
      return new ReturnType("error", error);
  });
}

export async function info(): Promise<ReturnType> {
  return await instance({
    method: "get",
    url: `${baseUrl}/auth`,
    withCredentials: true,
  })
    .then((response) => {
      return new ReturnType("ok", response.data);
    })
    .catch((error) => {
      return new ReturnType("error", error);
    });
}
