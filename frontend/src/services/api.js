import axios from "axios"

const API = axios.create({
  baseURL: "https://student-welfare-system.onrender.com"
})

export default API