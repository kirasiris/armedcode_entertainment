"use client";
import { toast } from "react-toastify";

const YourApiKey = ({ token = {} }) => {
	return (
		<>
			<input
				value={token?.value || "armed_code_sk_12345abcdef67890"}
				type="text"
				className="form-control text-bg-dark"
				disabled
			/>
			<button
				className="btn btn-light btn-sm"
				onClick={() => {
					navigator.clipboard.writeText(
						token?.value || "armed_code_sk_12345abcdef67890"
					);
					toast.success("Copied", "bottom");
				}}
			>
				<i aria-hidden className="fa-regular fa-clone" />
			</button>
		</>
	);
};

export default YourApiKey;
