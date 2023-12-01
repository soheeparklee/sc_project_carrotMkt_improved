import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg7yMs7AzjmeL9_IbnHC4Opr6w3arJPkI",
  authDomain: "sc-carrotmarket-improved-563ec.firebaseapp.com",
  databaseURL: "https://sc-carrotmarket-improved-563ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sc-carrotmarket-improved-563ec",
  storageBucket: "sc-carrotmarket-improved-563ec.appspot.com",
  messagingSenderId: "597909697827",
  appId: "1:597909697827:web:7ec58dbdfd62dd7b660896"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

//Authetication
const auth = getAuth(app);