import axios from "axios";
import { tokenkey } from "../utils/auth";

const BACKEND_API = "https://interview.optimavaluepro.com/api/v1/";

function reqHeaders() {
  if (
    localStorage.getItem(tokenkey) !== null &&
    localStorage.getItem(tokenkey) !== "" &&
    localStorage.getItem(tokenkey) !== "undefined"
  ) {
    const accesstoken = localStorage.getItem(tokenkey);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accesstoken}`;
  }
}

function setHttpHeaderMultipartToken() {
  if (
    localStorage.getItem(tokenkey) !== null &&
    localStorage.getItem(tokenkey) !== "" &&
    localStorage.getItem(tokenkey) !== "undefined"
  ) {
    const accesstoken = localStorage.getItem(tokenkey);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accesstoken}`;
    axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  }
}

export function postRequestAPI({ url = "", data = {} }) {
  reqHeaders();
  return axios.post(`${BACKEND_API}${url}`, data);
}

export function getRequestAPI({ url = "", params = {} }) {
  reqHeaders();
  return axios.get(`${BACKEND_API}${url}`, params);
}

export function deleteRequestAPI({ url = "", data = {} }) {
  reqHeaders();
  return axios.delete(`${BACKEND_API}${url}`, data);
}

export function putRequestAPI({ url = "", data = {} }) {
  setHttpHeaderMultipartToken();
  return axios.put(`${BACKEND_API}${url}`, data);
}
