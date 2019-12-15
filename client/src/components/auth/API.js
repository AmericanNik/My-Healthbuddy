import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:5000/",
  responseType: "json"
});
