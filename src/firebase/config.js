import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIRESTORE_API,
    authDomain: import.meta.env.VITE_FIRESTORE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIRESTORE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIRESTORE_APP_ID,
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
