import Router from 'next/router';
import { parseCookies } from 'nookies';
import { api as apiFunction } from '../services/api';
import { logOut } from './logOut';

export async function getUserLogged(api) {
    if (typeof window !== 'undefined') {
        const cookies = parseCookies();
        if (cookies['firebaseAccount'] != null) {
            let userLogged = false;
            await api
                .get(`/users/isMyUidExternalRegistered`)
                .then((response) => {
                    const { data } = response;

                    data == null && logOut();

                    if (data === 'This user does not have an account in our system') {
                        Router.push('/register/isLogged');
                    }

                    userLogged = data[0];
                })
                .catch(() => console.log('Erro ao se conectar com o servidor'));

            if (userLogged !== false) {
                return userLogged;
            }
        } else {
            return logOut();
        }
    }
}
