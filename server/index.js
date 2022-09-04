const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const { Novu, PushProviderIdEnum } = require("@novu/node");
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

const novu = new Novu("cdaa6070dfc6e6edf820515f19a90627");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let eventList = [];

// socketIO.on("connection", (socket) => {
// 	console.log(`⚡: ${socket.id} user just connected!`);

// 	socket.on("newSchedule", (schedule) => {
// 		eventList.unshift(schedule);
// 		socket.emit("sendSchedules", eventList);
// 	});

// 	let interval = setInterval(function () {
// 		if (eventList.length > 0) {
// 			for (let i = 0; i < eventList.length; i++) {
// 				if (
// 					Number(eventList[i].hour) === new Date().getHours() &&
// 					Number(eventList[i].minute) === new Date().getMinutes() &&
// 					new Date().getSeconds() === 0
// 				) {
// 					socket.emit("notification", {
// 						title: eventList[i].title,
// 						hour: eventList[i].hour,
// 						mins: eventList[i].minute,
// 					});
// 				}
// 			}
// 		}
// 	}, 1000);

// 	socket.on("disconnect", () => {
// 		socket.disconnect();
// 	});
// });

app.get("/api", async (req, res) => {
	const subscriberId = '62d1fc97bbe3160014a8cb1113'
	await novu.subscribers.identify(subscriberId, {
		firstName: 'Dima',
		lastName: 'Grossman'
	})

	await novu.subscribers
		.setCredentials(subscriberId, PushProviderIdEnum.FCM, {
			deviceTokens: [
				"c8P_K1Y3nexdn1wM87lY8C:APA91bEnL9IPUdRdEvBMSM10ApIGTGmcdCSeDf3-fIIaDmdyYRnSls_6r9VJ36gGpKyfBUuU15Ebc44MpQSnFH1lwAJgPnSeomv7GhbLexF03qSB9w-CRmSP6z0LJbWXT_BNETRuyy-g",
			],
		});

	const trigger= await novu
		.trigger("on-boarding-notification-DyhJZuHvb", {
			to: {
				subscriberId: subscriberId,
			},
			payload: {
				title: "David",
				body: "Working!",
			},
		})

		res.json(trigger.data);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
