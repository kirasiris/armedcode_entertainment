"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchurl } from "@/helpers/fetchurl";

const ServiceForm = ({}) => {
	const router = useRouter();

	const [btnText, setBtnText] = useState("Submit");

	const createServiceEmail = async (e) => {
		e.preventDefault();
		setBtnText(`Processing...`);

		const form = e.target;
		const formData = new FormData(form);

		const rawFormData = {
			name: formData.get("name"),
			email: formData.get("email"),
			subject: formData.get("subject"),
			text: formData.get("text"),
		};

		const res = await fetchurl(
			`/global/serviceemails`,
			"POST",
			"no-cache",
			rawFormData
		);
		if (res.status === "error") {
			toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		if (res.status === "fail") {
			toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		setBtnText("Submit");
		toast.success("Email sent", "bottom");
		resetForm();
		router.push(`/`);
	};

	const resetForm = () => {
		e.target.closest("form").reset();
	};

	return (
		<form onSubmit={createServiceEmail}>
			<label htmlFor="name" className="form-label">
				Name
			</label>
			<input
				id="name"
				name="name"
				type="text"
				className="form-control text-bg-dark mb-3"
				required
				placeholder="John Doe"
				defaultValue=""
			/>
			<label htmlFor="email" className="form-label">
				Email
			</label>
			<input
				id="email"
				name="email"
				type="email"
				className="form-control text-bg-dark mb-3"
				required
				placeholder="john@doe.com"
				defaultValue=""
			/>
			<label htmlFor="subject" className="form-label">
				Subject
			</label>
			<select
				id="subject"
				name="subject"
				className="form-control text-bg-dark mb-3"
				required
				defaultValue=""
			>
				<option value="none">Choose an option</option>
				<option value="nfa-transfer">NFA Transfer</option>
				<option value="software-development">Software Development</option>
			</select>
			<label htmlFor="text" className="form-label">
				Message
			</label>
			<textarea
				id="text"
				name="text"
				className="form-control text-bg-dark mb-3"
				required
				placeholder={`Here goes the message`}
				rows="3"
				defaultValue=""
			/>
			<button type="submit" className="btn btn-light btn-sm float-start">
				{btnText}
			</button>
			<button
				type="reset"
				onClick={resetForm}
				className="btn btn-light btn-sm float-end"
			>
				Reset
			</button>
		</form>
	);
};

export default ServiceForm;
