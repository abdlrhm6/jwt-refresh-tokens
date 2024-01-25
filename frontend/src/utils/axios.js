import axios from "axios";
import {jwtDecode } from "jwt-decode"
// import { Token } from "../../../backend/models/token.model";

export const instance = axios.create({
    baseURL: "http://localhost:4000/api/auth",
    withCredentials: true,
})


export const refreshInstance = axios.create({
    baseURL: "http://localhost:4000/api/auth",
    withCredentials: true,
})

const refreshToken = async ()=> {
    const cookies = document.cookie.split("; ")
    const refreshCookie = cookies.find((cookie)=>cookie.startsWith("refresh-token=")).split("=")[1]
    
    const {data} = await instance.post("/refresh" , {token:refreshCookie})
  
    return data
}

refreshInstance.interceptors.request.use(async (config)=>{
    const time = new Date().getTime()
    const token = document.cookie.split("=")[1]
    const decodedToken = jwtDecode(token)

    
    if(decodedToken.exp *1000 < time){
        const {accessToken} = await  refreshToken()
        config.headers['authorization'] = `Bearer ${accessToken}`
    }
    return config

},(err)=> {
    return Promise.reject(err)
})