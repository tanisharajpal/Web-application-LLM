import axios from 'axios'

const baseURL = `http://127.0.0.1:5000/api`;

export const api = axios.create({
    baseURL: baseURL,
});


export const updateToken = (newToken) => {
  sessionStorage.setItem('token', newToken);
}

export const removeToken = () => {
  sessionStorage.removeItem('token');
}
