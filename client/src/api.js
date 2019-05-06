import axios from "axios";

export const API = axios.create({
  baseURL: `http://${window.location.hostname}:15133/`
});
