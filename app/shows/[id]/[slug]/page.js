import { notFound } from "next/navigation";
import Image from "next/image";
import ExportModal from "@/components/global/exportmodal";
import ChapterList from "@/components/show/chapterlist";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import Globalcontent from "@/layout/content";
import Globalsidebar from "@/layout/sidebar";

async function getShows(params) {
	const res = await fetchurl(`/global/playlists${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

async function getChapters(params) {
	const res = await fetchurl(`/global/videos${params}`, "GET", "no-cache");
	return res;
}

const ShowRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "orderingNumber";

	const show = await getShows(`/${awtdParams.id}`);

	const chapters = await getChapters(
		`?resourceId=${show?.data?._id}&page=${page}&limit=${limit}&sort=${sort}`
	);

	return (
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
									-<span className="badge">{show?.data?.onairstatus}</span>
								</div>
							</div>
							<div className="card bg-black text-bg-dark rounded-0">
								<ChapterList
									allLink={`/shows/${show?.data?._id}/${show?.data?.slug}`}
									pageText="Episodes"
									searchOn={`/shows/${show?.data?._id}`}
									searchedKeyword=""
									objects={chapters}
									searchParams={awtdSearchParams}
								/>
							</div>
						</Globalcontent>
						<Globalsidebar classList="col d-none d-sm-none d-md-none d-lg-block dm-xl-block">
							<div className="card bg-black text-bg-dark rounded-0 mb-3">
								<div className="card-header">Featured Image</div>
								<div className="card-body bg-dark p-0">
									<figure className="m-0">
										<Image
											className="img-fluid"
											src={
												show?.data?.files?.avatar?.location?.secure_location ||
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
	);
};

export default ShowRead;
