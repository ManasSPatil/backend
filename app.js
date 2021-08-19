//server main file
const express = require("express");
const cors    = require("cors");
// Connecting Database
const { mongoConnect } = require("./utils/database");
const router  = require("./routes/router");
const http = require("http");
const { Server } = require("socket.io")
const {initSocket} = require("./utils/sockets")

//importing environment variables
require("dotenv").config({
	path: `${__dirname}/.env`,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// api the add-on before every route to separate from frontend routes

app.use("/api", router);
const httpServer = http.createServer(app);
const port = parseInt(process.env.PORT) || 5000;

mongoConnect((client) => {
	//.Port to suit the deployment server and 3000 for local server
	httpServer.listen(port, null, null, () => {
		console.log(`Serve at http://localhost:${port}`);
	});
});

const io = require("socket.io")(httpServer, { cors: { origin: '*' } });
module.exports = io