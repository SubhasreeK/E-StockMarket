import axios from "axios";
export default axios.create({
  baseURL: "http://65.2.90.227:8000",
  headers: {
    "Content-type": "application/json"
  }
});