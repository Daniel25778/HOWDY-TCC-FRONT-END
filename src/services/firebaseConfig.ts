import firebase, { getApp, getApps } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// export default {
//   apiKey: "AIzaSyC0TK97o4ONPa4Uzs385gV9rFJ8Y38hkPQ",
//   authDomain: "howdyproject-a86f8.firebaseapp.com",
//   projectId: "https://howdyproject-a86f8.firebaseio.com",
//   storageBucket: "howdyproject-a86f8",
//   messagingSenderId: "howdyproject-a86f8.appspot.com",
//   appId: "1:111780684034:web:b4bce20e907102e222621b",
// };

var firebaseConfig = {
    apiKey: 'AIzaSyCZVKp-Lro_WvFsAsY-UnWUJRBPhJ2j1uc',
    authDomain: 'howdyservices-19a3b.firebaseapp.com',
    projectId: 'howdyservices-19a3b',
    storageBucket: 'howdyservices-19a3b.appspot.com',
    messagingSenderId: '370892906655',
    appId: '1:370892906655:web:4b5d43a7f8589f537002aa',
};

let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
}

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { firebase, auth, database, firebaseApp };
