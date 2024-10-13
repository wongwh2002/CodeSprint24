import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCIdZaMzh2y0jVG6B7pZzvYWkL0-wBAZwU",
  authDomain: "codesprint-psa.firebaseapp.com",
  projectId: "codesprint-psa",
  storageBucket: "codesprint-psa.appspot.com",
  messagingSenderId: "22149265660",
  appId: "1:22149265660:web:394701b54f9722beffff79",
  measurementId: "G-KXNQPQF7RR",
};

const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);
// const analytics = getAnalytics(app);\
