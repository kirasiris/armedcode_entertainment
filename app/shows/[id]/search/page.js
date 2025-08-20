import ChapterList from "@/components/show/chapterlist";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import Image from "next/image";

async function getShows(params) {
	const res = await fetchurl(`/global/playlists/${params}`, "GET", "no-cache");
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

	const show = await getShows(`/${awtdParams.id}`);

	const chapters = await getChapters(
		`?resourceId=${show?.data?._id}&page=${page}&limit=${limit}&sort=${sort}&keyword=${keyword}`
	);

	return (
		<section className="bg-dark text-bg-dark py-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-10">
						<div className="card rounded-0 mb-3">
							<div className="card-header">
								{show?.data?.title || "Untitled"}
							</div>
							<div className="card-body bg-black text-bg-dark">
								<ParseHtml text={show?.data?.text} />
							</div>
						</div>
						<div className="card rounded-0">
							<ChapterList
								allLink={`/shows/${show?.data?._id}/${show?.data?.slug}`}
								pageText="Episodes"
								searchOn={`/shows/${show?.data?._id}`}
								searchedKeyword={keyword}
								objects={chapters}
								searchParams={awtdSearchParams}
							/>
						</div>
					</div>
					<div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 d-none d-sm-none d-md-none d-lg-block dm-xl-block">
						<figure className="mb-3 bg-light p-1">
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
			</div>
		</section>
	);
};

export default ShowReadSearchIndex;
