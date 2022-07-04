import axios from "axios";
export default axios.create({
  baseURL: "http://43.205.53.10:8000",
  headers: {
    "Content-type": "application/json"
  }
});