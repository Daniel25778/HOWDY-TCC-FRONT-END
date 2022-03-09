import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { api } from './services/api';

import firebase from 'firebase/app';
import 'firebase/compat/database';
import { setCookie, parseCookies  } from 'nookies';

import firebaseConfig from './services/firebaseConfig';
import { useEffect } from 'react';
import  Router  from 'next/router';

initializeApp(firebaseConfig);

const {'firebase.token': token } = parseCookies()

export default { 
    
    
    googleLogInto: async () => {

        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        let result = await signInWithPopup(auth, provider);
        let token = await result.user.getIdToken();

        setCookie( undefined, 'firebase', token, {
            maxAge : 60 * 60 * 24 * 30,
            path: '/'
        })

        api.defaults.headers['Authorization'] = `${token}`

        try {
            api.get(`users/isMyUidExternalRegistered`).then((response) => {
                const {data} = response
                if (data === 'This user does not have an account in our system') {
                    Router.push('/PageCadastro?isLogged=true');  
                }
            });
        } catch (error) {
           
        }
       
    },
};
