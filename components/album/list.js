"use client";
import Single from "./single";
import NumericPagination from "@/layout/numericpagination";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import SearchBar from "@/layout/album/searchbar";

const List = ({
	objects = [],
	categories = [],
	searchedKeyword = "",
	searchParams = {},
}) => {
	return (
		<section className="bg-dark text-bg-dark py-5">
			<div className="container">
				<SearchBar objects={categories} />
				{objects?.data?.length > 0 ? (
					<div className="row">
						{objects.data?.map((blog) => (
							<Single key={blog._id} object={blog} />
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
