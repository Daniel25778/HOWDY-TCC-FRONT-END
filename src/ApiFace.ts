import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    FacebookAuthProvider,
    signInWithPopup,
} from '@firebase/auth';
import { api } from '../src/services/api';

import firebase from 'firebase/app';
import 'firebase/compat/database';

import firebaseConfig from './services/firebaseConfig';

export default {
    facebookLogInto: async () => {
        const auth = getAuth();

        setPersistence(auth, browserSessionPersistence);

        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    },
};
