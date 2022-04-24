import firebase, { getApp, getApps } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

var firebaseConfig = {
    apiKey: 'AIzaSyC0TK97o4ONPa4Uzs385gV9rFJ8Y38hkPQ',
    authDomain: 'howdyproject-a86f8.firebaseapp.com',
    projectId: 'https://howdyproject-a86f8.firebaseio.com',
    storageBucket: 'howdyproject-a86f8',
    messagingSenderId: 'howdyproject-a86f8.appspot.com',
    appId: '1:111780684034:web:b4bce20e907102e222621b',
};

let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
}

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
console.log(storage);

export { firebase, storage, auth, database, firebaseApp };
