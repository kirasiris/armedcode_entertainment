"use client";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
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
			<article
				key={object._id}
				className={`col-xl-3 col-lg-4 col-md-6 col-12 mb-3 ${object._id}`}
			>
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
							src={object.files?.avatar?.location?.secure_location}
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
							{object.category[0].title || "Undefined"}
						</span>
						<h5>{object.title}</h5>
						<ParseHtml text={object.excerpt} classList="card-text" />
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
