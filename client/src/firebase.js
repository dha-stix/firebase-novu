import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyA1I-EXSCYzemW8esjvTV4BSF171mJskfQ",
	authDomain: "nextjs-invoice.firebaseapp.com",
	projectId: "nextjs-invoice",
	storageBucket: "nextjs-invoice.appspot.com",
	messagingSenderId: "254972337230",
	appId: "1:254972337230:web:019c500a3ac9700018371f",
	measurementId: "G-BMC3B54TLQ"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export const getTokenFrom = () => {
	return getToken(messaging, {
		vapidKey: "BDHkeFXHKxWkAtwfxqMcrXBNaacatCdOxRIr2XO2GxX-sgBdnwaEfr8hx7ivc20GCoA0CbNID0yhqdgywCBtBpg"
	})
		.then((currentToken) => {
			if (currentToken) {
				console.log("current token for client: ", currentToken);
			} else {
				console.log(
					"No registration token available. Request permission to generate one."
				);
			}
		})
		.catch((err) => {
			console.log("An error occurred while retrieving token. ", err);
		});
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			console.log(payload, 'ASDASDA')
			resolve(payload);
		});
	});
