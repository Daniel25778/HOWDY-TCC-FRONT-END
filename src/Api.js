import { async } from '@firebase/util';
import * as firebase from "firebase/app"
import firebase from 'firebase/compat/app';



import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default{

    googleLogInto: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    let result = await firebase.auth().signInWithPopup(provider);
    return result;
    }

}
