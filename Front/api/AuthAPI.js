import { data } from "browserslist";
import { api } from "./client"

const controller = new AbortController();

export const AuthAPI = {
  login: async function (username, password) {
    
    const response = await api.request({
      url: `/auth/login/`,
      method: "POST",
      signal: controller.signal,
      data: {
        username: username,
        password: password,
      }
    })
    if(response) {
      return response.data
    }
  },
  sigup: async function (username, password) {
    
    const response = await api.request({
      url: `/auth/singup/`,
      method: "POST",
      signal: controller.signal,
      data: {
        username: username,
        password: password,
      }
    })
    if(response) {
      return response.data
    }
  },
  abort: function(){
    controller.abort()
  },
}