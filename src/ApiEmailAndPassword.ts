import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { api } from './services/api';

import firebase from 'firebase/app';
import 'firebase/compat/database';

import firebaseConfig from './services/firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

export default {
    logIntoEmailAndPassword: async () => {
      
    },
};
