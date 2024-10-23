const loginPage = document.getElementById('login-page');
const chatPage = document.getElementById('chatpage');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageDiv = document.getElementById('messages');

//Firebase Auth Setup
import {initialiseApp} from "https://www.gstatic.com/firebasejs/9.1.3/firebase.app.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase.app.js";

import {
    getDatabase,
    ref,
    push,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase.app.js";

import { firebaseConfig } from './firebase.config';

// Initialising the Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

//Sign in with Google
loginButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
        // hide login page and show chat page after successful login
        loginPage.classList.add('hidden')
        chatPage.classList.remove('hidden')
    })
    .catch((error) => {
        console.error('Error during login', error)
    })
});

//Sign out 

logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Show login page and hide chat page after logout
        loginPage.classList.remove('hidden')
        chatPage.classList.add('hidden')
    })
});

//Send message
sendButton.addEventListener('click', () => {
    // Get message from input field
    const message = messageInput.value
    if(message) {
        //Reference to the "messages" node in the database
        const messageRef = ref(database, 'messages')
        // Push new message to the database with user info and timestamp
        push(messageRef, {
            user: auth.currentUser.displayName,
            message: message, 
            timestamp: new Date().toISOString()
        })
        // Clear the input field after sending
        messageInput.value = ''
    }

})
