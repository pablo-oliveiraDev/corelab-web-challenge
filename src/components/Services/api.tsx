import axios, { Axios } from 'axios';

const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API!,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});
export default Api;
