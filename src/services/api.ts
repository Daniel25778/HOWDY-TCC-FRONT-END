import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

export const api = axios.create({
    baseURL: 'http://10.107.144.4:3333//',
    headers: {
        Authorization: `${cookies['firebase.token']}`,
    },
});
