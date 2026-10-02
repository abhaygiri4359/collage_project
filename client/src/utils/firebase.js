
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "collageproject-caa08.firebaseapp.com",
  projectId: "collageproject-caa08",
  storageBucket: "collageproject-caa08.firebasestorage.app",
  messagingSenderId: "121494409698",
  appId: "1:121494409698:web:collageproject"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}