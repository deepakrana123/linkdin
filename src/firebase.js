// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCeAoV0PCn1iS3DWmOfI1PNrmqXvEtaBkI",
  authDomain: "instagramclone-27c60.firebaseapp.com",
  databaseURL: "https://instagramclone-27c60.firebaseio.com",
  projectId: "instagramclone-27c60",
  storageBucket: "instagramclone-27c60.appspot.com",
  messagingSenderId: "968722149191",
  appId: "1:968722149191:web:62878589071c947569e662",
  measurementId: "G-V4XM9W4KC3"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {storage , auth , provider };
export default db;