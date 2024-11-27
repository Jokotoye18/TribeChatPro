import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://dummy-chat-server.tribechat.pro/api",
});
