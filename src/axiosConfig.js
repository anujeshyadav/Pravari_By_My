import axios from "axios";

const instance = axios.create({
  // baseURL: "http://3.6.37.16:8000",
  baseURL: "https://invoice-o.com/Infinity/api/ApiCommonController",
});

export default instance;
