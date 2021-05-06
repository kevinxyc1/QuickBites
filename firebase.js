
import 'firebase/firebase-firestore';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyA7O6RZh4e9hbbe_9ZNJW4DX2boPXO2ngc",
  authDomain: "restaurant-project-1db01.firebaseapp.com",
  databaseURL: "https://restaurant-project-1db01.firebaseio.com",
  projectId: "restaurant-project-1db01",
  storageBucket: "restaurant-project-1db01.appspot.com",
  messagingSenderId: "218362957049",
  appId: "1:218362957049:web:98b58e10919be46c63e628",
  measurementId: "G-X486Y6PYEH"
};

var firebase = require('firebase/app')
firebase.initializeApp(firebaseConfig);
require('firebase/firestore')
export const databaseRef = firebase.firestore();



export function writeUserData(name, address, items, prices, oldPrices, contact){
  console.log("In my function");
  databaseRef.collection("food_items").doc(name).set({
    Name: name,
    Address: address,
    Items: items,
    New_Prices: prices,
    Old_Prices: oldPrices,
    Phone: contact
  })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.log("Error writing document: ", error);
    });
}

