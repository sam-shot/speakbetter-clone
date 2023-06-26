/*
 * Give the service worker access to Firebase Messaging.
 * Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// Firebase confing
const firebaseConfig = {
    apiKey: "AIzaSyDBE3WoR8yrVhKRHFus_QoV4oSCz5-2n4k",
    authDomain: "copy-n-sync.firebaseapp.com",
    projectId: "copy-n-sync",
    storageBucket: "copy-n-sync.appspot.com",
    messagingSenderId: "818553963570",
    appId: "1:818553963570:web:fb1ce48c0943ae6a49282b",
    measurementId: "G-486J0FPL4Q"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/*
 * Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(async function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // Customize notification here
    const notificationTitle = payload.data.message;
    const notificationOptions = {
        body: payload.data.body,
        icon: '',
        image: ''
    };
    
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ action: 'copyToClipboard', text: payload.data.message });
        });
      });
      const channel = new BroadcastChannel('sw-messages');
channel.postMessage({title: payload.data.message});

      
      
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});




