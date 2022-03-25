import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    browserSessionPersistence,
    setPersistence,
} from '@firebase/auth';
import { api } from './services/api';

import firebase from 'firebase/app';
import 'firebase/compat/database';
import { setCookie, parseCookies } from 'nookies';
import { useEffect } from 'react';
import Router from 'next/router';
import { auth } from './services/firebaseConfig';

const { 'firebase.token': token } = parseCookies();

export default {
    googleLogInto: async () => {
        try {
            setPersistence(auth, browserSessionPersistence);
            const provider = new GoogleAuthProvider();
            let result = await signInWithPopup(auth, provider);
            let idToken = await result.user.getIdToken();

            setCookie(undefined, 'firebaseAccount', idToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            });

            api.defaults.headers['Authorization'] = `${idToken}`;

            api.get(`users/isMyUidExternalRegistered`)
                .then((response) => {
                    const { data } = response;
                    if (data === 'This user does not have an account in our system') {
                        Router.push('register/isLogged');
                    } else {
                        Router.push('UserPage/Post/1');
                    }
                })
                .catch(() => console.log('Erro ao se conectar com o servidor'));
        } catch (error) {
            console.log(error);
        }
    },
};
