import { UserLogged } from './../interfaces/UserLogged';
import { parseCookies } from 'nookies';
import { logOut } from './logOut';
import { goToIncompleteRegisterPage } from './goToIncompleteRegisterPage';

export async function getUserLogged(api) {
    if (typeof window !== 'undefined') {
        const cookies = parseCookies();
        if (cookies['firebaseAccount'] != null) {
            let loggedUserFound = null;
            await api
                .get(`users/isMyUidExternalRegistered`)
                .then((response) => {
                    const { data } = response;
                    data == null && false;

                    if (data.length === 0) {
                        goToIncompleteRegisterPage()
                    }

                    loggedUserFound = data[0];
                })
                .catch(() => console.log('Erro ao se conectar com o servidor'));

            if (loggedUserFound !== null) {
                const userLogged: UserLogged = loggedUserFound;
                return userLogged;
            }
        } else {
            return logOut();
        }
    }
}
