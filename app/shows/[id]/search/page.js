import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import ExportModal from "@/components/global/exportmodal";
import ChapterList from "@/components/show/chapterlist";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import Globalcontent from "@/layout/content";
import Globalsidebar from "@/layout/sidebar";
import Loading from "@/app/shows/loading";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import ErrorPage from "@/layout/errorpage";

async function getShows(params) {
	const res = await fetchurl(`/global/playlists${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

async function getChapters(params) {
	const res = await fetchurl(`/global/videos${params}`, "GET", "no-cache");
	return res;
}

const ShowReadSearchIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword || "";
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "orderingNumber";

	const { settings } = await getGlobalData();

	const show = await getShows(`/${awtdParams.id}`);

	const chapters = await getChapters(
		`?resourceId=${show?.data?._id}&page=${page}&limit=${limit}&sort=${sort}&keyword=${keyword}`,
	);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Search results of ${awtdSearchParams.keyword}`}
				description={`Search results...`}
				favicon={settings?.data?.favicon}
				postImage={show.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category={show.data.category.title}
				url={`/shows/${show.data._id}/search?keyword=${awtdSearchParams.keyword}&page=${page}&limit=${limit}&sort=${sort}`}
				author={show.data.user.name}
				createdAt={show.data.createdAt}
				updatedAt={show.data.updatedAt}
				locales=""
				posType="blog"
			/>
			{settings?.data?.maintenance === false ? (
				<Suspense fallback={<Loading />}>
					<section className="bg-dark text-bg-dark py-5">
						<div className="container">
							{show?.data?.status === "published" ||
							awtdSearchParams.isAdmin === "true" ? (
								<div className="row">
									<Globalcontent classList="col-lg-8">
										<div className="card bg-black text-bg-dark rounded-0 mb-3">
											<div className="card-header">
												{show?.data?.title || "Untitled"}
											</div>
											<div className="card-body bg-dark text-bg-dark">
												<ParseHtml text={show?.data?.text} />
											</div>
											<div className="card-footer bg-black text-bg-dark">
												<span className="badge me-1">
													{show?.data?.category[0].title || "Undefined"}
												</span>
												-
												<span className="badge">{show?.data?.onairstatus}</span>
											</div>
										</div>
										<div className="card bg-black text-bg-dark rounded-0">
											<ChapterList
												allLink={`/shows/${show?.data?._id}/${show?.data?.slug}`}
												pageText="Episodes"
												searchOn={`/shows/${show?.data?._id}`}
												searchedKeyword={keyword}
												objects={chapters}
												searchParams={awtdSearchParams}
											/>
										</div>
									</Globalcontent>
									<Globalsidebar classList="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 d-none d-sm-none d-md-none d-lg-block dm-xl-block">
										<div className="card bg-black text-bg-dark rounded-0 mb-3">
											<div className="card-header">Featured Image</div>
											<div className="card-body bg-dark p-0">
												<figure className="m-0">
													<Image
														className="img-fluid"
														src={
															show?.data?.files?.avatar?.location
																?.secure_location ||
															`https://source.unsplash.com/random/260x370`
														}
														alt={`${show?.data?.files?.avatar?.location?.filename}'s featured image`}
														width={440}
														height={570}
														priority
													/>
												</figure>
											</div>
										</div>
										<ExportModal
											object={show?.data}
											linkToShare={`/shows/${show?.data?._id}/${show?.data?.slug}`}
											iconSize="45"
										/>
									</Globalsidebar>
								</div>
							) : (
								<p>Not visible</p>
							)}
						</div>
					</section>
				</Suspense>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default ShowReadSearchIndex;
