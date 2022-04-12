import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { logOut } from '../functions/logOut';

export function api() {
    if (typeof window !== 'undefined') {
        const cookies = parseCookies();

        const api = axios.create({
            baseURL: 'http://localhost:3333/',
            headers: {
                Authorization: `${cookies['firebaseAccount']}`,
            },
        });

        api.interceptors.response.use(
            (response) => {
                console.log('resposta interceptor', response)
                return response;
            },
            (error) => {
                switch (error) {
                    case 'You does not have an account registered in our system.':
                        logOut();
                        break;

                    case 'Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.':
                        logOut();
                        break;

                    case 'Could not find the Token id, check if it is in the "authorization" field inside the request header.':
                        logOut();
                        break;

                    case 'Error on the idToken validation':
                        logOut();
                        break;

                    case 'Error on finding user':
                        logOut();
                        break;

                    default:
                        break;
                }

                if (error.response.status === 404) {
                    return {data: []}
                }

                return error;
            }
        );

        return api;
    }
}
