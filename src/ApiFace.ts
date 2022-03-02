import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup } from '@firebase/auth';
import { api } from '../src/services/api';

import firebase from 'firebase/app';
import 'firebase/compat/database';

import firebaseConfig from './services/firebaseConfig';

// const firebaseApp = initializeApp(firebaseConfig);

export default {
    facebookLogInto: async () => {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    },
};
