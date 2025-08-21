"use client";
import Single from "./chaptersingle";
import NumericPagination from "@/layout/numericpagination";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import CardHeaderMenu from "../cardheadermenu";

const ChapterList = ({
	allLink = "",
	pageText = "",
	addLink = "",
	searchOn = "",
	searchedKeyword = "",
	objects = [],
	searchParams = {},
}) => {
	return (
		<>
			<CardHeaderMenu
				allLink={allLink}
				pageText={pageText}
				currentResults={objects?.count}
				totalResults={objects?.countAll}
				addLink={addLink}
				searchOn={searchOn}
				classList=""
			/>
			{objects?.data?.length > 0 ? (
				<>
					<ul
						className="list-group list-group-flush"
						style={{ maxHeight: "1000px" }}
					>
						{objects?.data?.map((chapter) => (
							<Single
								key={chapter._id}
								object={chapter}
								objects={objects.data}
							/>
						))}
						<li className="list-group-item bg-dark text-bg-dark">
							{objects?.pagination?.current} / {objects?.pagination?.totalpages}
						</li>
					</ul>
					<NumericPagination
						totalPages={
							objects?.pagination?.totalpages ||
							Math.ceil(objects?.data?.length / searchParams.limit)
						}
						searchParams={searchParams}
						siblings={1}
					/>
				</>
			) : (
				<NothingFoundAlert
					classList="alert-dark rounded-0 m-0 border-0"
					text={`Nothing found with ${searchedKeyword}`}
				/>
			)}
		</>
	);
};

export default ChapterList;
