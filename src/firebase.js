import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// import { cityDb } from './temp/m-city-export';

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
const DB = firebase.firestore();
const matchesCollection = DB.collection('matches');
const playersCollection = DB.collection('players');
const positionsCollection = DB.collection('positions');
const promotionsCollection = DB.collection('promotions');
const teamsCollection = DB.collection('teams');

// cityDb.matches.forEach(item => {
//   matchesCollection.add(item)
// });

// cityDb.players.forEach(item => {
//   playersCollection.add(item)
// });

// cityDb.positions.forEach(item => {
//   positionsCollection.add(item)
// });

// cityDb.promotions.forEach(item => {
//   promotionsCollection.add(item)
// });

// cityDb.teams.forEach(item => {
//   teamsCollection.add(item)
// });



export {
    firebase,
    matchesCollection,
    playersCollection,
    positionsCollection,
    promotionsCollection,
    teamsCollection
}