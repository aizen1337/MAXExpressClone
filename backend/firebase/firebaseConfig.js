// Import the functions you need from the SDKs you need
const firebaseApp = require('firebase/app')
const firestore = require('firebase/firestore')
require('dotenv').config()
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const app = firebaseApp.initializeApp(firebaseConfig);
const database = firestore.getFirestore()
module.exports = {
    firebaseApp,
    firestore,
    firebaseConfig,
    app,
    database
}