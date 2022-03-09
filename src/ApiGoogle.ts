import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { api } from './services/api';

import firebase from 'firebase/app';
import 'firebase/compat/database';
import { setCookie, parseCookies  } from 'nookies';

import firebaseConfig from './services/firebaseConfig';
import { useEffect } from 'react';

initializeApp(firebaseConfig);

const {'firebase.token': token } = parseCookies()

export default { 
    
    
    googleLogInto: async () => {
         
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        let result = await signInWithPopup(auth, provider);
        let { token } = await auth?.currentUser?.getIdTokenResult();
        console.log(token);

        setCookie( undefined, 'firebase', token, {
            maxAge : 60 * 60 * 24 * 30,
            path: '/'
        })

        api.get(`users/isMyUidExternalRegistered`).then((data) => console.log(data));
    },
};
