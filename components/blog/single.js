import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	calculateTimeSincePublished,
	formatDateWithoutTime,
} from "befree-utilities";
import Loading from "@/app/blog/loading";
import ParseHtml from "@/layout/parseHtml";

const Single = ({
	object = {},
	fullWidth = false,
	imageWidth = "415",
	imageHeight = "207",
}) => {
	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id}`}>
				<div
					className={`card border border-1 my-border-color bg-black text-bg-dark mb-3`}
				>
					<div className="card-header">
						<div className="small">
							{formatDateWithoutTime(object?.createdAt)}
						</div>
						<Link
							href={`/blog/${object?._id}/${object?.category?._id}/${object?.category?.slug}/${object?.slug}`}
						>
							{object?.title || "Untitled"}
						</Link>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
