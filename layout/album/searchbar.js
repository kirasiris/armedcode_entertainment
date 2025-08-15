"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ objects = [] }) => {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		keyword: "",
		category: "",
		sort: "-createdAt",
	});

	const { keyword, category, sort } = searchParams;

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`/albums/search?keyword=${keyword}&category=${category}&page=1&limit=36&sort=${sort}`
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
					id="category"
					name="category"
					value={category}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							category: e.target.value,
						});
					}}
					className="form-control"
				>
					<option value="">Category</option>
					{objects[0]?.data?.map((category, index) => (
						<option key={category._id} value={category._id}>
							{category.title}
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
