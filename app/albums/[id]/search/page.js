import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import ExportModal from "@/components/global/exportmodal";
import SongList from "@/components/album/songlist";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import Globalcontent from "@/layout/content";
import Globalsidebar from "@/layout/sidebar";
import Loading from "@/app/albums/loading";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import ErrorPage from "@/layout/errorpage";

async function getAlbums(params) {
	const res = await fetchurl(`/global/playlists${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

async function getSongs(params) {
	const res = await fetchurl(`/global/songs${params}`, "GET", "no-cache");
	return res;
}

const AlbumReadSearchIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword || "";
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "orderingNumber";

	const { settings } = await getGlobalData();

	const album = await getAlbums(`/${awtdParams.id}`);

	const songs = await getSongs(
		`?resourceId=${album?.data?._id}&page=${page}&limit=${limit}&sort=${sort}&keyword=${keyword}`,
	);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Search results of ${awtdSearchParams.keyword}`}
				description={`Search results...`}
				favicon={settings?.data?.favicon}
				postImage={album.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category={album.data.category.title}
				url={`/albums/${album.data._id}/search?keyword=${awtdSearchParams.keyword}&page=${page}&limit=${limit}&sort=${sort}`}
				author={album.data.user.name}
				createdAt={album.data.createdAt}
				updatedAt={album.data.updatedAt}
				locales=""
				posType="blog"
			/>
			{settings?.data?.maintenance === false ? (
				<Suspense fallback={<Loading />}>
					<section className="bg-dark text-bg-dark py-5">
						<div className="container">
							{album?.data?.status === "published" ||
							awtdSearchParams.isAdmin === "true" ? (
								<div className="row">
									<Globalcontent classList="col-lg-8">
										<div className="card bg-black text-bg-dark rounded-0 mb-3">
											<div className="card-header">
												{album?.data?.title || "Untitled"}
											</div>
											<div className="card-body bg-dark text-bg-dark">
												<ParseHtml text={album?.data?.text} />
											</div>
											<div className="card-footer bg-black text-bg-dark">
												<span className="badge me-1">
													{album?.data?.category[0].title || "Undefined"}
												</span>
												-
												<span className="badge">
													{album?.data?.onairstatus}
												</span>
											</div>
										</div>
										<div className="card bg-black text-bg-dark rounded-0">
											<SongList
												allLink={`/albums/${album?.data?._id}/${album?.data?.slug}`}
												pageText="Songs"
												searchOn={`/albums/${album?.data?._id}`}
												searchedKeyword=""
												objects={songs}
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
															album?.data?.files?.avatar?.location
																?.secure_location ||
															`https://source.unsplash.com/random/260x370`
														}
														alt={`${album?.data?.files?.avatar?.location?.filename}'s featured image`}
														width={440}
														height={570}
														priority
													/>
												</figure>
											</div>
										</div>
										<ExportModal
											object={album?.data}
											linkToShare={`/albums/${album?.data?._id}/${album?.data?.slug}`}
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

export default AlbumReadSearchIndex;
