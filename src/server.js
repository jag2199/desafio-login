import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express"
import bodyParser from "body-parser"
import http from "http"
const app = express()
const PORT = 8080
import rutaLogin from "./routes/login.js"
import rutaLogout from "./routes/logout.js"
import rutaProductos from "./routes/home.js"
import { Server as ioServer } from "socket.io"
import MsjContainer from "./daos/msj.js"
import session from "express-session"
import MongoStore from "connect-mongo"

import dotenv from "dotenv"
dotenv.config()

const httpServer = http.createServer(app)
const io = new ioServer(httpServer)

app.set("view engine", "ejs")
app.set("views", __dirname + "/public/views")

// middlewares
app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@clustercab.kfxke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            ttl: 60 * 10
        })
    }
))

app.use("/login", rutaLogin)
app.use("/logout", rutaLogout)
app.use("/", rutaProductos)


// io
io.on("connection", (socket) => {
    console.log("conectado")
    // socket.emit("productos", container.getAll())

    // socket.on("newProd", (arg) => {
    //     console.log(arg)
    //     io.sockets.emit("productos", container.getAll())
    // })
    let msjDB = new MsjContainer()

    const msj = msjDB.getAll()

    socket.emit("chat", msj)

    socket.on("newMsj", newMsj => {
        msjDB.save(newMsj)
        io.sockets.emit("chat", msj)
    })
})

// server
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${server.address().port} ( http://localhost:${server.address().port} )`)
})

server.on("error", error => console.log(error))