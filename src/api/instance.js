import axios from "axios";
import { API_BASE_URL } from "../constants/endpoints";
import * as RequestInterceptor from "./interceptors/request";
import * as ResponseInterceptor from "./interceptors/response";

const getInstance = baseUrl => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 30000
  });
  instance.interceptors.request.use(
    RequestInterceptor.addAccessToken,
    RequestInterceptor.onRejected
  );
  instance.interceptors.response.use(
    ResponseInterceptor.onFullfilled,
    ResponseInterceptor.onRejected
  );
  return instance;
};

export const apiClient = getInstance(API_BASE_URL);
