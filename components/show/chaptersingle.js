"use client";
import Link from "next/link";
import PreviewModal from "./previewmodal";

const Single = ({ object = {} }) => {
	return (
		<li
			className={`list-group-item ${object?.orderingNumber} bg-dark text-bg-dark`}
		>
			<div className="float-start">
				<Link
					href={{
						pathname: `/shows/chapter/${object?._id}/read`,
						query: {},
					}}
				>
					<span className="badge bg-secondary me-1">
						{object?.orderingNumber}
					</span>
					{object?.title}
				</Link>
			</div>
			<div className="float-end">
				<div className="blog-item__panel">
					{object.free_preview && <PreviewModal object={object} />}
					<span className="badge bg-info me-1">{object.duration}</span>
					<span className="badge bg-secondary me-1">
						{object.views}&nbsp;Views
					</span>
					<span className="badge bg-dark me-1">
						{object.language.toUpperCase()}
					</span>
				</div>
			</div>
		</li>
	);
};

export default Single;
