import Router from 'next/router';
import { setCookie } from 'nookies';

export function logOut() {
    setCookie(undefined, 'firebaseAccount', null, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
    });

    Router.push('/LoginPage');
}
