"use client";
import { calculateTimeSincePublished } from "befree-utilities";
import { Suspense } from "react";
import ParseHtml from "@/layout/parseHtml";

const Loading = () => {
	return <>Loading reviews...</>;
};

const Single = ({
	object = {},
	fullWidth = false,
	imageWidth = "415",
	imageHeight = "207",
}) => {
	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id}`}>
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<div className="card-header d-flex justify-content-between align-items-center">
						<div>
							<p className="fw-bold mb-0">{object?.title}</p>
							<small className="text-secondary">
								<i aria-hidden className="fa-regular fa-calendar me-1" />
								About {calculateTimeSincePublished(object?.createdAt)} by{" "}
								{object?.name}
							</small>
						</div>
						<p className="mb-0">
							{[...Array(object.rating)].map((_, index) => (
								<i key={index} aria-hidden className="fa-solid fa-star"></i>
							))}
						</p>
					</div>
					<div className="card-body">
						<ParseHtml text={object?.text} parseAs="p" classList="mb-0" />
						{/* <div className="d-flex flex-wrap gap-3">
							{[...Array(10)].map((_, index) => (
								<Image
									key={index}
									alt="Placeholder image"
									src={`https://kzmjk7r94butx83hi0jq.lite.vusercontent.net/placeholder.svg?height=400&width=600`}
									className="img-fluid rounded m-1 m-sm-0"
									width={600}
									height={400}
									style={{
										maxWidth: "150px",
										height: "auto",
										objectFit: "cover",
									}}
								/>
							))}
						</div> */}
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
