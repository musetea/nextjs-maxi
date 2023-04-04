console.log("backend");
import express from "express";
import morgan from "morgan";
import cors from "cors";
import eventsRouter from "./routes/events";
import newsletterRouter from "./routes/newsletter";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/events", eventsRouter);
app.use("/newsletter", newsletterRouter);

export default app;
