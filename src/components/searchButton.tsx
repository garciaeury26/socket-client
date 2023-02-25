import { StateUpdater } from "preact/hooks";

interface Props {
	handleSubmit: (e: Event) => void;
	setMessage: StateUpdater<string>;
	message: string;
}

export const SearchButton = ({ handleSubmit, setMessage, message }: Props) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="relative">
				<input
					onChange={(e: Event) => setMessage(e.target?.value)}
					name='message'
					value={message}
					type="text"
					placeholder="Message"
					class="py-2 pl-10 pr-4 rounded-full bg-gray-900 text-gray-500 focus:outline-none  focus:text-gray-300"
				/>
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						style="fill: #fff;transform: ;msFilter:;"
					>
						<path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z" />
						<circle cx="9.5" cy="11.5" r="1.5" />
						<circle cx="14.5" cy="11.5" r="1.5" />
					</svg>
				</div>
			</div>
		</form>
	);
};
