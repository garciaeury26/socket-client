import { useEffect, useState } from "preact/hooks";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";
import preactLogo from "./assets/preact.svg";
import { SearchButton } from "./components/searchButton";
import { TokenButton } from "./components/tokenButton";
import { connectToServer } from "./utils/socket-client";

export interface Message {
	fullName: string;
	message: string;
}

export function App() {

	const [socket, setSocket] = useState<Socket>();
	const [online, setOnline] = useState(false);
	const [clients, setClients] = useState<string[]>([]);
	const [token, setToken] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);



	const handleConnect = () => {
		if (token.length <= 0) return alert('Token no valido');
		// borrar los listener anteriores si existen
		socket?.removeAllListeners()
		// conectarse al socket
		setSocket(connectToServer({ token: token.trim() }));
		toast.success('Successfully toasted!')
		setToken('')
	}

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const data: Message = {
			fullName: " eury",
			message,
		};
		socket?.emit("message-from-client", data);
		setMessage("");
	};

	useEffect(() => {

		if (socket) {
			socket?.on("connect", () => {
				console.log("connected");
				setOnline(true);
			});

			socket?.on("disconnect", () => {
				console.log("disconnectd");
				setOnline(false);
			});

			// obtener los clientes connectados en vivo
			socket?.on("clients-connected", (ids) => {
				console.log(ids);
				setClients((state) => [...ids]);
			});

			//obtener los mensajes
			socket.on("message-from-server", (payload: Message) => {
				console.log(payload)
				setMessages((state) => [...state, { ...payload }]);
			});
		}

	}, [socket]);

	return (
		<div className='w-screen h-screen flex gap-10 items-center  justify-center'>
			<div className='flex flex-col'>
				<h1 className='font-bold '>Socket Client</h1>
				<div className='border flex flex-col justify-center items-center border-[#ccc]'>
					<h2 className='text-2xl '>Messages</h2>
					<ul className='p-4'>
						{messages.map(({ message, fullName }) => (
							<li>
								<div class="flex flex-row items-start mb-4">
									<img src="https://yt3.ggpht.com/yti/AHXOFjW6onzagdlOcn5UeW57LGRkVGAewzXK6OYrEtKRhQ=s88-c-k-c0x00ffffff-no-rj-mo" alt="Avatar del usuario" class="rounded-full w-8 h-8 mr-3" />
									<div class="flex-1 bg-gray-900 rounded-lg p-2">
										<div class="flex flex-row gap-4 items-center justify-between">
											<h3 class="font-semibold text-gray-600">{fullName}</h3>
											<span class="text-xs text-gray-600">27 Feb 2023</span>
										</div>
										<p class="text-gray-200 text-sm mt-2">{message}</p>
									</div>
								</div>

							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<span className={`${!online ? "text-red-400" : "text-green-300"} `}>
					{online ? "Online" : "Ofline"}
				</span>
				<h2 className='text-2xl'>Connect clients</h2>
				<ul>
					{clients.map((id) => (
						<li key={id} className=''>
							{id}
						</li>
					))}
				</ul>
				<div className="gap-2 mt-3 flex flex-col">
					<TokenButton token={token} setToken={setToken} handleConnect={handleConnect} />
					<SearchButton
						setMessage={setMessage}
						message={message}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
}
