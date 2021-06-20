import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import logger from "./logger";
import morgan from "morgan";
import path from "path";
import uuidMiddleware from "./middleware/uuidMiddleware";
import env from "./env";
import { v4 as uuidv4 } from "uuid";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";

/** Instances */
dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});
const peerServer = ExpressPeerServer(httpServer, {
    debug: true,
});

/** Middlewares */
app.use(cors());
app.use(express.json({ limit: env.server.bodyLimit }));
app.use(express.urlencoded({ extended: true }));
app.use(uuidMiddleware);
app.use("/peerjs", peerServer);

/** Engine View */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/** Assets */
app.use("/static", express.static(path.join(__dirname, "/public")));

/** Logger */
morgan.token("id", (req) => {
    return req.id;
});
morgan.token("date", function () {
    return new Date().toLocaleString("pt-BR");
});
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(morgan(":id :remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] :body \":referrer\" \":user-agent\"", {
    stream: logger.stream
}));

/** Routers */
app.get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
    res.render("room", { roomId: req.params.room });
});

app.all("*", (req, res) => {
    res.json({ message: "Rota Não Encontrada" });
});

export { io, app, httpServer, peerServer };