// Importing all necessary modules
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');

// Getting the firebase configuration
const config = require('./config');

// Initialize Firebase
const admin = initializeApp(config);

// Initialize Firestore
const db = getFirestore(admin);
// Initialize Authentication
const auth = getAuth(admin);

module.exports = { admin, db, auth };