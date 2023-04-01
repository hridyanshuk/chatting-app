import axios from "axios"
import baseurl from "./baseurl"
const instance = axios.create({
  baseURL: "https://texting-webapp.herokuapp.com"
})

export default instance
//axios.post('/bin')