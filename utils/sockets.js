/*//To initiate socket connection
let io

const initSocket = (serv) => {
	io = require("socket.io")(serv, { cors: { origin: '*' } });

	io.on('connection', (socket) => {
		console.log('Client connected');
		socket.on('disconnect', () => console.log('Client disconnected'));
	});
}

module.exports = {io, initSocket};*/
