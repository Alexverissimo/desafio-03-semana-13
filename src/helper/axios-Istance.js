import axios from "axios"

const gitUsers = axios.create({
    baseURL :'https://api.github.com/users/',
})

export default gitUsers