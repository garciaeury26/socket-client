import { Manager, Socket } from "socket.io-client";

let socket: Socket

export const connectToServer = ({ token }: { token: string }) => {
	const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
		// puedes masdarle objectos en los headers
		extraHeaders: {
			authentication: token
		}
	});

	// socket parametro => namespce => sala
	manager?.removeAllListeners()
	socket = manager.socket("/");

	return socket;
};
