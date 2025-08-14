"use client";
import Single from "./single";
import NumericPagination from "@/layout/numericpagination";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import Globalcontent from "@/layout/content";
import Sidebar from "@/layout/review/sidebar";

const List = ({ objects = [], searchParams = {}, returtopageurl = "/" }) => {
	return (
		<section className="bg-black py-5 text-bg-dark">
			<div className="container">
				<div className="row">
					<Globalcontent>
						{objects?.data?.length > 0 ? (
							<>
								{objects.data.map((review) => (
									<Single key={review._id} object={review} />
								))}
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
							<NothingFoundAlert />
						)}
					</Globalcontent>
					<Sidebar objects={objects} returtopageurl={returtopageurl} />
				</div>
			</div>
		</section>
	);
};

export default List;
