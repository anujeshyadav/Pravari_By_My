import axios from "axios";

const instance = axios.create({
  baseURL: "http://sureshzh.beget.tech/pravari/api/ApiCommonController",
});

export default instance;
