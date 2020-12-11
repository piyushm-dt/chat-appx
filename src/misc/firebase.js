import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCge8Mo6KFZI0ySU4Ln9XjOLuEbFTOifo4",
    authDomain: "chatx-web-app.firebaseapp.com",
    databaseURL: "https://chatx-web-app-default-rtdb.firebaseio.com",
    projectId: "chatx-web-app",
    storageBucket: "chatx-web-app.appspot.com",
    messagingSenderId: "768450237637",
    appId: "1:768450237637:web:3a85170525d56e997a0cac"
  };


  const app = firebase.initializeApp(config);

  export const auth = app.auth();
  export const database = app.database();