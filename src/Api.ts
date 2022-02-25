import { async } from '@firebase/util';
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

import firebaseConfig from './firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

export default{

    googleLogInto: async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        let result = await signInWithPopup(auth, provider);
        console.log(result);
        return result;
    }

}
