import axios from "axios";
export default axios.create({
  baseURL: "https://43.205.53.10:8012",
  headers: {
    "Content-type": "application/json"
  }
});