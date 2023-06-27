importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js');

// Initialize Firebase in the service worker

const text = document.createElement("textarea");
document.body.append(text);

const firebaseConfig = {
    apiKey: "AIzaSyDBE3WoR8yrVhKRHFus_QoV4oSCz5-2n4k",
    authDomain: "copy-n-sync.firebaseapp.com",
    projectId: "copy-n-sync",
    storageBucket: "copy-n-sync.appspot.com",
    messagingSenderId: "818553963570",
    appId: "1:818553963570:web:fb1ce48c0943ae6a49282b",
    measurementId: "G-486J0FPL4Q",
  };
firebase.initializeApp(firebaseConfig);

// Get the messaging instance
const messaging = firebase.messaging();

// Handle incoming messages
messaging.onBackgroundMessage((payload) => {
  // Copy the message to the clipboard
  const textToCopy = payload.data.message;
  text.value = textToCopy;
    text.select();
    document.execCommand("copy");
console.log(urls);
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      console.log('Text copied to clipboard:', textToCopy);
    })
    .catch((error) => {
      console.error('Failed to copy text to clipboard:', error);
    });
});
