// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { collection, getFirestore, getDocs, doc, addDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)


// LUEGO LO MOVEMOS EN OTRO SITIO!!

// collection ref
const colRef = collection(database, 'movies')

let movies = [];  // eso devuelve un array con todas las pelis
// get collection data
getDocs(colRef)
  .then((snapshot) => {
    //console.log('snapshot:::', snapshot)
    snapshot.docs.forEach((doc) => {
      movies.push({ ...doc.data() })
    })
  })

// console.log('database: ', database)
// console.log('colRef: ', colRef)
// console.log('Movies: ', movies);