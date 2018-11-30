import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const prodConfig = {
  apiKey: "AIzaSyBfj7dtJM5SNFLtuU2MOpyKzI7_7goVb7U",
  authDomain: "grocery-buddy-cfb2e.firebaseapp.com",
  databaseURL: "https://grocery-buddy-cfb2e.firebaseio.com",
  projectId: "grocery-buddy-cfb2e",
  storageBucket: "",
  messagingSenderId: "94558970960",
};

const devConfig = {
  apiKey: "AIzaSyCI1wGdq4DS01VRLDH7gwO1uoF-UfavMIY",
  authDomain: "grocery-list-3d8fd.firebaseapp.com",
  databaseURL: "https://grocery-list-3d8fd.firebaseio.com",
  projectId: "grocery-list-3d8fd",
  storageBucket: "",
  messagingSenderId: "310179503392",
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length){
  firebase.initializeApp(config);
}

const auth = firebase.auth();

const database = firebase.database();

export {
  auth,
  database,
};
