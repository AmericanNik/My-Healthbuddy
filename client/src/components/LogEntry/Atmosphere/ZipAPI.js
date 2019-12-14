import axios from "axios";

export default axios.create({
  baseURL: "https://my-healthbuddy.herokuapp.com/api/v1/dataCall/zipcode"
});
