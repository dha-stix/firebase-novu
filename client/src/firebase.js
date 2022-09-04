import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyA1I-EXSCYzemW8esjvTV4BSF171mJskfQ",
	authDomain: "nextjs-invoice.firebaseapp.com",
	projectId: "nextjs-invoice",
	storageBucket: "nextjs-invoice.appspot.com",
	messagingSenderId: "254972337230",
	appId: "1:254972337230:web:4e7f435f4e480e1a18371f",
	measurementId: "G-29FG3587X2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export const getTokenFrom = () => {
	return getToken(messaging, {
		vapidKey:
			"BLHwpbkdS0P3r4m8mrT_VPvQE-fh2iiaLeSeNynKQozlP8a1q3Y2oIRCKrAvWBT8QESPH7380WmMXRrbJ2H-TjU",
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
			resolve(payload);
		});
	});
