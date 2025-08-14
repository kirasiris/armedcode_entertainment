"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import Globalsidebar from "../sidebar";
import { fetchurl } from "@/helpers/fetchurl";

const Sidebar = ({ returtopageurl = "/" }) => {
	const router = useRouter();

	const [reviewData, setReviewData] = useState({
		rating: 1,
		title: ``,
		text: ``,
		name: ``,
		email: ``,
		website: ``,
		files: [],
		uploadedFileData: [], // Store data from secondary API
	});
	const [btnText, setBtnText] = useState("Submit");
	const { rating, title, text, name, email, website } = reviewData;

	// Function to handle file upload to secondary API
	const handleFileUpload = async (selectedFiles) => {
		try {
			for (let i = 0; i < selectedFiles.length; i++) {
				const response = await axios.put(
					`${process.env.NEXT_PUBLIC_FILE_UPLOADER_URL}/uploads/uploadobject`,
					{
						userId: process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_ID,
						username: "kirasiris",
						userEmail: "from.reviews@armedcodellc.com",
						onModel: undefined,
						file: selectedFiles[i],
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);

				console.log("response from files uploaded", response);
				if (response.success) {
					setReviewData((prevState) => ({
						...prevState,
						uploadedFileData: response.data, // Store the retrieved data
					}));
				} else {
					toast.error("File upload failed");
				}
			}
		} catch (error) {
			console.error("Error uploading files:", error);
			toast.error("Error uploading files");
		}
	};

	// Handle file input change
	const handleFileChange = (e) => {
		const selectedFiles = e.target.files;
		const invalidFiles = Array.from(selectedFiles).filter((file) =>
			/\s/.test(file.name)
		);

		if (invalidFiles.length > 0) {
			toast.error(
				"File names cannot contain spaces. Please rename your files."
			);
			e.target.value = ""; // Reset input to prevent invalid files from being uploaded
			return;
		}

		setReviewData({ ...reviewData, files: selectedFiles });
		handleFileUpload(selectedFiles); // Upload files immediately
	};

	const createReview = async (e) => {
		e.preventDefault();
		setBtnText("Processing...");
		const res = await fetchurl(`/global/comments`, "POST", "no-cache", {
			...reviewData,
			user: undefined,
			onModel: undefined,
			status: "published",
			postType: "review",
			registeredFrom: process.env.NEXT_PUBLIC_WEBSITE_NAME,
			registeredAt: process.env.NEXT_PUBLIC_WEBSITE_URL,
		});
		if (res.status === "error") {
			toast.error(res.message, `bottom`);
			setBtnText("Submit");
			return;
		}
		setBtnText("Submit");
		toast.success(`Review added`, `bottom`);
		resetForm();
		router.push(returtopageurl);
	};

	const resetForm = () => {
		setReviewData({
			rating: 1,
			title: ``,
			text: ``,
			name: ``,
			email: ``,
			website: ``,
		});
	};

	return (
		<Globalsidebar>
			<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
				<div className="card-body">
					<h3>Filter Reviews</h3>
					<p className="text-secondary">
						Select rating filters to narrow down reviews
					</p>
					<p>Rating</p>
					<ul className="list-unstyled">
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 10,
									},
								}}
							>
								{[...Array(10)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
							</Link>
							10 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 9,
									},
								}}
							>
								{[...Array(9)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								<i aria-hidden className="fa-regular fa-star"></i>
							</Link>
							9 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 8,
									},
								}}
							>
								{[...Array(8)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(2)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							8 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 7,
									},
								}}
							>
								{[...Array(7)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(3)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							7 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 6,
									},
								}}
							>
								{[...Array(6)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(4)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							6 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 5,
									},
								}}
							>
								{[...Array(5)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(5)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							5 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 4,
									},
								}}
							>
								{[...Array(4)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(6)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							4 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 3,
									},
								}}
							>
								{[...Array(3)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(7)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							3 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 2,
									},
								}}
							>
								{[...Array(2)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(8)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							2 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 1,
									},
								}}
							>
								<i aria-hidden className="fa-solid fa-star"></i>
								{[...Array(9)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							1 Star
						</li>
					</ul>
					<Link
						href={{
							pathname: `/review`,
							query: {},
						}}
						className="btn btn-light btn-sm w-100"
					>
						Clear
					</Link>
				</div>
			</div>
			<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
				<div className="card-body">
					<h3>Write a Review</h3>
					<p className="text-secondary">
						Share your experience with our services
					</p>
					<form onSubmit={createReview}>
						<label htmlFor="rating" className="form-label">
							Rating
						</label>
						<select
							id="rating"
							name="rating"
							value={rating}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									rating: e.target.value,
								});
							}}
							className="form-control text-bg-dark mb-3"
						>
							{[...Array(10)].map((_, index) => (
								<option key={index} value={index + 1}>
									{index + 1}
								</option>
							))}
						</select>
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							id={`title`}
							name={`title`}
							value={title}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									title: e.target.value,
								});
							}}
							type="text"
							className="form-control text-bg-dark mb-3"
							required
							placeholder="Title *"
						/>
						<label htmlFor="text" className="form-label">
							Text
						</label>
						<textarea
							id="text"
							name="text"
							value={text}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									text: e.target.value,
								});
							}}
							className="form-control text-bg-dark mb-3"
							required
							placeholder="Tell us what you think!"
							rows="3"
						/>
						<label htmlFor="name" className="form-label">
							Name
						</label>
						<input
							id={`name`}
							name={`name`}
							value={name}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									name: e.target.value,
								});
							}}
							type="text"
							className="form-control text-bg-dark mb-3"
							required
							placeholder="Name *"
						/>
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							id={`email`}
							name={`email`}
							value={email}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									email: e.target.value,
								});
							}}
							type="email"
							className="form-control text-bg-dark mb-3"
							required
							placeholder="Email *"
						/>
						<label htmlFor="website" className="form-label">
							Website
						</label>
						<input
							id={`website`}
							name={`website`}
							value={website}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									website: e.target.value,
								});
							}}
							type="url"
							className="form-control text-bg-dark mb-3"
							placeholder="Website"
						/>
						{/* <label htmlFor="files" className="form-label">
							Add Photos or Videos (Optional)
						</label>
						<input
							id={`files`}
							name={`files`}
							type="file"
							className="form-control text-bg-dark mb-3"
							multiple
							onChange={handleFileChange}
						/> */}
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
				</div>
			</div>
		</Globalsidebar>
	);
};

export default Sidebar;
