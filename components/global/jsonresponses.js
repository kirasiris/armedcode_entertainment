"use client";
import { toast } from "react-toastify";
import ParseHtml from "@/layout/parseHtml";

const JsonResponses = ({ text = "" }) => {
	return (
		<>
			<ParseHtml
				text={text}
				classList="bg-black text-bg-dark w-100 m-0"
				parseAs="pre"
			/>
			<button
				className="btn btn-light btn-sm"
				onClick={() => {
					navigator.clipboard.writeText(text || "");
					toast.success("Copied", "bottom");
				}}
			>
				<i aria-hidden className="fa-regular fa-clone" />
			</button>
		</>
	);
};

export default JsonResponses;
