import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyChpOsuTg7f_EsyJqjShzcY8POusMYiPK4",
    authDomain: "phaser-multiplayer-test.firebaseapp.com",
    databaseURL: "https://phaser-multiplayer-test-default-rtdb.firebaseio.com",
    projectId: "phaser-multiplayer-test",
    storageBucket: "phaser-multiplayer-test.appspot.com",
    messagingSenderId: "519611176356",
    appId: "1:519611176356:web:85f5b4f2b5d733e1e95d31",
    measurementId: "G-LRGW16MJE9"
};

const app = initializeApp(firebaseConfig);

export {app};