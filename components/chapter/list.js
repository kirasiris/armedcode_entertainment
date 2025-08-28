"use client";
import Single from "./single";
import NumericPagination from "@/layout/numericpagination";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import SearchBar from "@/layout/chapter/searchbar";

const List = ({
	objects = [],
	secondaryobjects = [],
	searchedKeyword = "",
	searchParams = {},
}) => {
	return (
		<section className="bg-dark text-bg-dark py-5">
			<div className="container">
				<SearchBar objects={objects} secondaryobjects={secondaryobjects} />
				{objects?.data?.length > 0 ? (
					<div className="row g-4">
						{objects.data?.map((chapter) => (
							<Single key={chapter._id} object={chapter} />
						))}
						<NumericPagination
							totalPages={
								objects?.pagination?.totalpages ||
								Math.ceil(objects?.data?.length / searchParams.limit)
							}
							searchParams={searchParams}
							siblings={1}
						/>
					</div>
				) : (
					<NothingFoundAlert text={`Nothing found with ${searchedKeyword}`} />
				)}
			</div>
		</section>
	);
};

export default List;
