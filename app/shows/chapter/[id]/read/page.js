import { Suspense } from "react";
import { formatDateWithoutTime } from "befree-utilities";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import Loading from "@/app/shows/loading";
import Link from "next/link";
import Head from "@/app/head";

async function getChapter(params) {
	const res = await fetchurl(`/global/videos${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

async function getChapters(params) {
	const res = await fetchurl(`/global/videos${params}`, "GET", "no-cache");
	return res;
}

const ReadChapter = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const chapter = await getChapter(`/${awtdParams.id}`);
	const chapters = await getChapters(
		`?resourceId=${chapter?.data?.resourceId?._id}&sort=createdAt`
	);

	console.log("chapter", chapter?.data);

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={chapter.data.title}
				description={chapter.data.excerpt || chapter.data.text}
				// favicon=""
				postImage={chapter.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				// category={chapter.data.category.title}
				url={`/shows/chapter/${chapter.data._id}/${chapter.data.slug}`}
				author={chapter.data.user.name}
				createdAt={chapter.data.createdAt}
				updatedAt={chapter.data.updatedAt}
				locales=""
				posType="video"
			/>
			<article className="bg-dark">
				<div className="border-0 rounded-0 p-0 mb-3">
					<div className="container">
						<div className="ratio ratio-16x9">
							<iframe
								src={chapter?.data?.players?.mega}
								title={chapter?.data?.title}
								allowFullScreen
							/>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="card bg-black text-bg-dark mb-3">
								<div className="card-header">
									<div className="d-flex justify-content-between">
										<div className="">
											<button
												type="button"
												className="btn btn-danger btn-sm me-1"
											>
												Favorite
											</button>
											<button
												type="button"
												className="btn btn-secondary btn-sm me-1"
											>
												Likes
											</button>
											<button
												type="button"
												className="btn btn-secondary btn-sm me-1"
											>
												Dislikes
											</button>
											<button
												type="button"
												className="btn btn-secondary btn-sm"
											>
												Views {chapter?.data?.views}
											</button>
										</div>
										<div>
											<button type="button" className="btn btn-danger btn-sm">
												Subscribe
											</button>
										</div>
									</div>
								</div>
								<div className="card-body bg-dark">
									{chapter?.data?.title}
									<ParseHtml text={chapter?.data?.text} />
								</div>
								<div className="card-footer">
									<div className="d-flex justify-content-between">
										<button className="btn btn-secondary btn-sm">
											Language:&nbsp;{chapter?.data?.language}
										</button>
										<button className="btn btn-secondary btn-sm">
											Date:&nbsp;
											{formatDateWithoutTime(chapter?.data?.createdAt)}
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 mb-3">
							<div className="card bg-black text-bg-dark">
								<div className="card-header">Chapters</div>
								<div className="card-body bg-dark p-0">
									<div className="row row-cols-5 g-1">
										{chapters?.data?.length > 0 &&
											chapters?.data?.map((chapter, index) => (
												<div key={chapter._id} className={`col ${index + 1}`}>
													<Link
														href={{
															pathname: `/shows/chapter/${chapter?._id}/read`,
															query: {},
														}}
														className="d-block text-center p-1 border text-decoration-none"
													>
														{chapter?.orderingNumber}
													</Link>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default ReadChapter;
