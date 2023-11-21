import axios from "axios";

const instance = axios.create({
  baseURL: "https://portal.ordermystationery.com/api/ApiCommonController/",
  // baseURL: "http://sureshzh.beget.tech/pravari/api/ApiCommonController",
});

export default instance;
