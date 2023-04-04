import express from "express";
import bodyParser from "body-parser";
import MeetUpRouter from "./routes/meetup";

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("ACcess-Control-Allow-Headers", "Content-Type");
	next();
});

app.use("/", MeetUpRouter);

app.listen(3001, () => {
	console.log("Listenning 3001 Server...");
});
