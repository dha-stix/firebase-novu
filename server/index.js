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
	await novu.subscribers
		.setCredentials("62d1fc97bbe3160014a8cb23", PushProviderIdEnum.FCM, {
			deviceTokens: [
				"dL5ipQ0OdkPlhGGRwe6WRx:APA91bGfO25DmPjQm5FojQjdDP1hGP3yNd4f2jh7Y5vldF9MUNtBSJak3v5jbwabgZw71GIGxMAhRzwNaVEh3vT4GkN1EBDX8sM7GtIf9MvEWtM9OrnojQfzA05a3Xw1oRWqQtoL7dOo",
			],
		})
		.then(
			await novu
				.trigger("on-boarding-notification-DyhJZuHvb", {
					to: {
						subscriberId: "62d1fc97bbe3160014a8cb23",
					},
					payload: {
						title: "David",
						body: "Working!",
					},
				})
				.then((res) => console.log(res))
		)
		.catch((err) => console.error(err));
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
