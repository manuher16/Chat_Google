import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseBaseConfig = {
    apiKey: "AIzaSyC5m_YKoiSjCfQuDhHNZoE1gq7kqzhJVzM",
    authDomain: "x0-game-5d542.firebaseapp.com",
    databaseURL: "https://x0-game-5d542-default-rtdb.firebaseio.com",
    projectId: "x0-game-5d542",
    storageBucket: "x0-game-5d542.appspot.com",
    messagingSenderId: "556074069679",
    appId: "1:556074069679:web:8ba63ed93206a45ddcae5a",
    measurementId: "G-2G7W4QFSCK"
};

const app = initializeApp(firebaseBaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };