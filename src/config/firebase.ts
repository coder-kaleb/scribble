import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALt3O9XjU7BZDds9Pux9uyL3qhCUHwxyo",
  authDomain: "scribble-1afff.firebaseapp.com",
  projectId: "scribble-1afff",
  storageBucket: "scribble-1afff.appspot.com",
  messagingSenderId: "202050640337",
  appId: "1:202050640337:web:aa01e85426fd59a6d168f0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const colRef = collection(db, "note");
export const q = query(colRef, orderBy("timestamp", "desc"));
