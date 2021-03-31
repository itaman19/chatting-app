import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyB0Qv6tC_JL-xqTqMyTiBUGXRUCiJ_SPFc",
	authDomain: "amans-messenger-a4e8d.firebaseapp.com",
	projectId: "amans-messenger-a4e8d",
	storageBucket: "amans-messenger-a4e8d.appspot.com",
	messagingSenderId: "175522257603",
	appId: "1:175522257603:web:116baf81bb4c8a561a6076",
	measurementId: "G-TRDV3C2Z9Q",
});

const db = firebaseApp.firestore();

export default db;
