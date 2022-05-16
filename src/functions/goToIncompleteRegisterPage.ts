import Router from 'next/router';
import { setCookie } from 'nookies';

export function goToIncompleteRegisterPage() {
    Router.push('/register/false');
}
