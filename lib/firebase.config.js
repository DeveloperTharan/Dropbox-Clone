import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dropbox-clone-735cf.firebaseapp.com",
  projectId: "dropbox-clone-735cf",
  storageBucket: "dropbox-clone-735cf.appspot.com",
  messagingSenderId: "794648100912",
  appId: "1:794648100912:web:9bdc68129e96f67723edf5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);