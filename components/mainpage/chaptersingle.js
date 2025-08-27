"use client";
import { Suspense } from "react";
import Link from "next/link";
import Loading from "@/app/shows/loading";

const ChapterSingle = ({ object = {}, playlist = {}, index = 0 }) => {
	return (
		<Suspense fallback={<Loading />}>
			<article>
				<li className="list-group-item bg-dark text-bg-dark">
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<Link
								href={{
									pathname: `/shows/chapter/${object._id}/read`,
									query: {},
								}}
							>
								{object.title}
							</Link>
						</div>
					</div>
				</li>
			</article>
		</Suspense>
	);
};

export default ChapterSingle;
