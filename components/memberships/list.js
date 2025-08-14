"use client";
import NothingFoundAlert from "@/layout/nothingfoundalert";
import Single from "./single";

const List = ({ auth = {}, objects = [] }) => {
	return (
		<div className="col-lg-12 mb-3">
			<h4>Plans</h4>
			<div className="row">
				{objects?.data?.length > 0 ? (
					objects.data.map((membership) => (
						<Single key={membership._id} auth={auth} object={membership} />
					))
				) : (
					<NothingFoundAlert />
				)}
			</div>
		</div>
	);
};

export default List;
