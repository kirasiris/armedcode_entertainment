"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ objects = [], secondaryobjects = [] }) => {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		keyword: "",
		showId: "",
		sort: "-createdAt",
	});

	const { keyword, showId, sort } = searchParams;

	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const showQuery = showId ? `&resourceId=${showId}` : "";

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`/chapters/search?page=1&limit=36&sort=${sort}${keywordQuery}${showQuery}`
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
					id="showId"
					name="showId"
					value={showId}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							showId: e.target.value,
						});
					}}
					className="form-control"
				>
					<option value="">All Shows</option>
					{secondaryobjects?.data?.map((show) => (
						<option key={show?._id} value={show?._id}>
							{show?.title}
						</option>
					))}
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
					<option value="-averageRating">Highest Rated</option>
					<option value="averageRating">Lowest Rated</option>
					<option value="views">Most Viewed</option>
					<option value="-views">Less Viewed</option>
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
