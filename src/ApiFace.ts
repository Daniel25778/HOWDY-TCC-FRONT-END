import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    FacebookAuthProvider,
    signInWithPopup,
} from '@firebase/auth';
import { api as apiFunction } from './services/api';
import {
    Button,
    Flex,
    InputGroup,
    InputLeftElement,
    Text,
    Select,
    FormControl,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';

import firebase from 'firebase/app';
import 'firebase/compat/database';
import { auth } from './services/firebaseConfig';
import { setCookie } from 'nookies';
import Router from 'next/router';

export default {
    facebookLogInto: async () => {
        try {
            setPersistence(auth, browserSessionPersistence);
            const provider = new FacebookAuthProvider();
            let result = signInWithPopup(auth, provider);
            let idToken = await (await result).user.getIdToken();

            setCookie(undefined, 'firebaseAccount', idToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            });

            const api = apiFunction();
            api.defaults.headers['Authorization'] = `${idToken}`;

            api.get(`users/isMyUidExternalRegistered`)
                .then((response) => {
                    const { data } = response;
                    if (data === 'This user does not have an account in our system') {
                        Router.push('/register/isLogged');
                    } else {
                        Router.push('/UserPage/Post/1');
                    }
                })
                .catch(() => console.log('Erro ao se conectar com o servidor'));
        } catch (error) {
            const errorCode = error.code;
            if (errorCode === 'auth/account-exists-with-different-credential') {
            }
        }
    },
};
