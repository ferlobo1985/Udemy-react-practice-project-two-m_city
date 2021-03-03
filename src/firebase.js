import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBK5Ntm56dwkgPsJjrNQvZoJO4Ra1NcSlE",
    authDomain: "mcity-be50d.firebaseapp.com",
    projectId: "mcity-be50d",
    storageBucket: "mcity-be50d.appspot.com",
    messagingSenderId: "830895236791",
    appId: "1:830895236791:web:2f95951657334a2b79cf32",
    measurementId: "G-L63ZDH5RPG"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


export {
    firebase
}