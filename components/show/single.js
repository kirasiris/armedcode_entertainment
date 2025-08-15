"use client";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	calculateTimeSincePublished,
	formatDateWithoutTime,
} from "befree-utilities";
import Loading from "@/app/shows/loading";
import ParseHtml from "@/layout/parseHtml";

const Single = ({
	object = {},
	fullWidth = false,
	imageWidth = "415",
	imageHeight = "207",
}) => {
	return (
		<Suspense fallback={<Loading />}>
			<article key={object._id} className={`col-lg-2 pt-3 pb-3 ${object._id}`}>
				<div className="card bg-black text-bg-dark">
					<div>
						<span
							className="badge position-absolute text-bg-light text-capitalize"
							style={{
								top: "5px",
								left: "5px",
							}}
						>
							{object.onairtype}
						</span>
						<span
							className="badge position-absolute text-bg-light text-capitalize"
							style={{
								top: "5px",
								right: "5px",
							}}
						>
							{object.onairstatus}
						</span>
						<Image
							src={object.files?.avatar.location.secure_location}
							className="card-img-top"
							alt="..."
							width={356}
							height={192}
							style={{
								objectFit: "cover",
							}}
						/>
					</div>
					<div className="card-body">
						<span className="badge text-bg-light text-capitalize">
							{object.category[0].title}
						</span>
						<h5>{object.title}</h5>
						{/* <p className="card-text">
													<ParseHtml text={object.text} />
												</p> */}
					</div>
					<div className="card-footer">
						<Link
							href={{
								pathname: `/shows/${object._id}/${object.slug}`,
								query: {},
							}}
							className="btn btn-dark btn-sm w-100"
						>
							Continue Watching
						</Link>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
