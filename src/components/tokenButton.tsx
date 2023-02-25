import { StateUpdater } from "preact/hooks";

interface Props {
	setToken: StateUpdater<string>;
	token: string;
	handleConnect: () => void;
}

export const TokenButton = ({ setToken, token, handleConnect }: Props) => {
	return (
		<div className="relative flex gap-2">
			<input
				onChange={(e: Event) => setToken(e.target?.value)}
				name='token'
				value={token}
				type="text"
				placeholder="Json web token"
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
					<path d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z" />
				</svg>
			</div>
			<button onClick={handleConnect} className='bg-gray-900'>
				Connect
			</button>
		</div>
	);
};
