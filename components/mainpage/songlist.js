"use client";
import Link from "next/link";
import SongSingle from "./songsingle";

const SongList = ({ objects = [] }) => {
	return (
		<div className="card bg-black text-bg-dark rounded-0 mb-3">
			<div className="card-header">
				<div className="d-flex justify-content-between">
					<h6 className="align-content-center m-0">Recent Songs</h6>
					<Link
						href={{
							pathname: `/songs`,
							query: {},
						}}
						className="btn btn-outline-light btn-sm"
					>
						View All Songs
					</Link>
				</div>
			</div>
			<div className="card-body bg-dark text-bg-dark p-0">
				<ul
					className="list-group list-group-flush"
					style={{ maxHeight: "1000px", overflowY: "auto" }}
				>
					{objects?.data?.map((song, index) => (
						<SongSingle
							key={song?._id}
							object={song}
							objects={objects}
							index={index}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default SongList;
