"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ objects = [] }) => {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		keyword: "",
		type: "",
		categoryId: "",
		onairtype: "",
		onairstatus: "finished",
		sort: "-createdAt",
	});

	const { keyword, type, categoryId, onairtype, onairstatus, sort } =
		searchParams;

	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const categoryQuery = categoryId ? `&category=${categoryId}` : "";
	const onairtypeQuery = onairtype ? `&onairtype=${onairtype}` : "";
	const onairstatusQuery = onairstatus ? `&onairstatus=${onairstatus}` : "";

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`/shows/search?page=1&limit=36&sort=${sort}${onairtypeQuery}${onairstatusQuery}${keywordQuery}${categoryQuery}`
		);
	};

	return (
		<form className="row mb-3" onSubmit={searchData}>
			<div className="col-lg-6">
				<input
					id="keyword"
					name="keyword"
					value={keyword}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							keyword: e.target.value,
						});
					}}
					type="text"
					className="form-control"
					placeholder="Enter search term..."
				/>
			</div>
			<div className="col">
				<select
					id="onairtype"
					name="onairtype"
					value={onairtype}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							onairtype: e.target.value,
						});
					}}
					className="form-control"
				>
					<option value="">Type</option>
					<option value="anime">Anime</option>
					<option value="tv">TV</option>
					<option value="movie">Movie</option>
					<option value="special">Special</option>
					<option value="ova">Ova</option>
					<option value="video">Video</option>
				</select>
			</div>
			<div className="col">
				<select
					id="categoryId"
					name="categoryId"
					value={categoryId}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							categoryId: e.target.value,
						});
					}}
					className="form-control"
				>
					<option value="">Category</option>
					{onairtype === "anime" &&
						objects[0]?.data?.map((category, index) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					{onairtype === "tv" &&
						objects[1]?.data?.map((category, index) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					{onairtype === "movie" &&
						objects[2]?.data?.map((category, index) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					{onairtype === "special" &&
						objects[3]?.data?.map((category, index) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					{onairtype === "ova" &&
						objects[4]?.data?.map((category, index) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					{onairtype === "video" &&
						objects[5]?.data?.map((category, index) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
				</select>
			</div>
			<div className="col">
				<select
					id="onairstatus"
					name="onairstatus"
					value={onairstatus}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							onairstatus: e.target.value,
						});
					}}
					className="form-control"
				>
					<option value="">On Air Type</option>
					<option value="onair">On Air</option>
					<option value="finished">Finished</option>
					<option value="soon">Coming Soon</option>
				</select>
			</div>
			<div className="col">
				<select
					id="sort"
					name="sort"
					value={sort}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							sort: e.target.value,
						});
					}}
					className="form-control"
				>
					<option value="">Sort</option>
					<option value="title">Title</option>
					<option value="-createdAt">ASC</option>
					<option value="createdAt">DESC</option>
				</select>
			</div>
			<div className="col">
				<button type="submit" className="btn btn-outline-light w-100">
					Submit
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
