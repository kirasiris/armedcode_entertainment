"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CardHeaderMenu = ({
	allLink = "",
	pageText = "",
	currentResults = 0,
	totalResults = 0,
	searchOn = "/noadmin",
	classList = "",
}) => {
	const router = useRouter();

	const [searchParams, setSearchParams] = useState({
		keyword: "",
	});

	const { keyword } = searchParams;

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`${searchOn}/search?keyword=${keyword}&page=1&limit=10&sort=-createdAt`
		);
	};

	return (
		<div className={`card-header${classList ? ` ${classList}` : ""}`}>
			<div className="float-start">
				<div className="d-flex align-items-center">
					<Link
						href={{
							pathname: allLink,
							query: { page: 1, limit: 10 },
						}}
						className="btn btn-link btn-sm"
					>
						{pageText} - ({currentResults} / {totalResults})
					</Link>
					<form
						onSubmit={searchData}
						className="d-none d-md-block d-lg-block d-xl-block d-xxl-block"
					>
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
							placeholder="Search title of object (EXACT MATCH)"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CardHeaderMenu;
