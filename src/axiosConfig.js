import axios from "axios";

const instance = axios.create({
  baseURL: "https://gismasoft.com/pravari/api/ApiCommonController",
  // baseURL: "https://invoice-o.com/Infinity/api/ApiCommonController",
});

export default instance;
