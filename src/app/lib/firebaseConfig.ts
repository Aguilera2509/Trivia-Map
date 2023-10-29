// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { TfirebaseConfig } from "./types";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig:TfirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY as string,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN as string,
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL as string,
    projectId: process.env.NEXT_PUBLIC_PROJECTID as string,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET as string,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID as string,
    appId: process.env.NEXT_PUBLIC_APPID as string,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID as string
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
    db,
};