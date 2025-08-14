"use client";
import React, { Suspense } from "react";
import ParseHtml from "@/layout/parseHtml";

const Single = ({ object = {}, router }) => {
	const loadWeapon = async (id) => {
		router.push(`/api/read?_id=${id}`, { scroll: false });
	};
	return (
		<Suspense>
			<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
				<div className="card-header d-flex justify-content-between align-items-center">
					<div>
						<p className="mb-0">{object.title}</p>
						<small className="text-secondary">
							{object.type} | {object.caliber} | SN: {object.serialNumber}
						</small>
					</div>
					<p
						className="mb-0"
						onClick={() => loadWeapon(object._id)}
						style={{ cursor: "pointer" }}
					>
						<span className="badge rounded-pill text-bg-light me-2">View</span>
					</p>
				</div>
				<div className="card-body">
					<ParseHtml text={object.text} parseAs="p" />
				</div>
			</div>
		</Suspense>
	);
};

export default Single;
