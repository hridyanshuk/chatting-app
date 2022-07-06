import axios from "axios"
import baseurl from "./baseurl"
const instance = axios.create({
  baseURL: baseurl
})

export default instance
