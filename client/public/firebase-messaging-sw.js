// Scripts for firebase and firebase messaging
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
	apiKey: "AIzaSyA1I-EXSCYzemW8esjvTV4BSF171mJskfQ",
	authDomain: "nextjs-invoice.firebaseapp.com",
	projectId: "nextjs-invoice",
	storageBucket: "nextjs-invoice.appspot.com",
	messagingSenderId: "254972337230",
	appId: "1:254972337230:web:4e7f435f4e480e1a18371f",
	measurementId: "G-29FG3587X2",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log("Received background message ", payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
