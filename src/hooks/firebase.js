import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


    const firebaseConfig = {
        apiKey: "AIzaSyBoM_88W7i8DgIhGTwBR0pyi6nK1qwfxuQ",
        authDomain: "recipeproject-2bb2b.firebaseapp.com",
        projectId: "recipeproject-2bb2b",
        storageBucket: "recipeproject-2bb2b.appspot.com",
        messagingSenderId: "270618516516",
        appId: "1:270618516516:web:ff72877c8fe60524700cb1"
    };

    const app = firebase.initializeApp(firebaseConfig);
    export const auth = app.auth();
    export const db = app.firestore();