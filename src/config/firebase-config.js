// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCGtYKA3Kp5KLomnrh2Sjw0fKL181MOhVs",

  authDomain: "socialbond-f91d5.firebaseapp.com",

  projectId: "socialbond-f91d5",

  storageBucket: "socialbond-f91d5.appspot.com",

  messagingSenderId: "803426290051",

  appId: "1:803426290051:web:7e8d8bfc05392498838eb6",

  measurementId: "G-7VNYXCJ8CC",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
