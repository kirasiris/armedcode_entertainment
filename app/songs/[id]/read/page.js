import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { formatDateWithoutTime } from "befree-utilities";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import Loading from "@/app/shows/loading";
import Head from "@/app/head";
import ExportModal from "@/components/global/exportmodal";
import LocalSongPlayer from "@/layout/localsongplayer";
import Image from "next/image";

async function getSong(params) {
	const res = await fetchurl(`/global/songs${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

async function getSongs(params) {
	const res = await fetchurl(`/global/songs${params}`, "GET", "no-cache");
	return res;
}

const ReadSong = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const song = await getSong(`/${awtdParams.id}`);
	const songs = await getSongs(
		`?resourceId=${song?.data?.resourceId?._id}&sort=createdAt`
	);

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={song.data.title}
				description={song.data.excerpt || song.data.text}
				// favicon=""
				postImage={song.data.files?.avatar?.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				// category={song.data.category.title}
				url={`/songs/${song.data._id}/read`}
				author={song.data.user.name}
				createdAt={song.data.createdAt}
				updatedAt={song.data.updatedAt}
				locales=""
				posType="audio"
			/>
			<article className="bg-dark">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 mt-3">
							<Image
								src={
									song?.data?.files?.avatar?.location?.secure_location ||
									"/placeholder.svg?height=300&width=300&query=music"
								}
								alt={song?.data?.title}
								className="img-fluid rounded"
								width={100}
								height={100}
								style={{
									width: "100%",
									aspectRatio: "1/1",
									objectFit: "cover",
								}}
							/>
						</div>
						<div className="col-lg-8 mt-3">
							<div className="ps-md-4">
								<h1 className="text-light mb-3">{song?.data?.title}</h1>

								{song?.data?.user && (
									<div className="mb-3">
										<h5 className="text-light mb-1">Artist</h5>
										<p className="text-light">{song?.data?.user.name}</p>
									</div>
								)}

								{song?.data?.duration && (
									<div className="mb-3">
										<h5 className="text-light mb-1">Duration</h5>
										<p className="text-light">{song?.data?.duration}</p>
									</div>
								)}

								{song?.data?.createdAt && (
									<div className="mb-3">
										<h5 className="text-light mb-1">Release Date</h5>
										<p className="text-light">
											{formatDate(song?.data?.createdAt)}
										</p>
									</div>
								)}

								{song?.data?.category && (
									<div className="mb-3">
										<h5 className="text-light mb-1">Category</h5>
										<p className="text-light">{song?.data?.category.name}</p>
									</div>
								)}

								{song?.data?.description && (
									<div className="mb-4">
										<h5 className="text-light mb-1">Description</h5>
										<p className="text-light">{song?.data?.description}</p>
									</div>
								)}
							</div>
						</div>
						<div className="col-lg-12">
							<LocalSongPlayer song={song?.data} />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-8">
							<div className="card bg-black text-bg-dark rounded-0 mb-3">
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
												Views {song?.data?.views}
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
									{song?.data?.title}
									<ParseHtml text={song?.data?.text} />
								</div>
								<div className="card-footer">
									<div className="d-flex justify-content-between">
										<button className="btn btn-secondary btn-sm">
											Language:&nbsp;{song?.data?.language}
										</button>
										<button className="btn btn-secondary btn-sm">
											Date:&nbsp;
											{formatDateWithoutTime(song?.data?.createdAt)}
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="card bg-black text-bg-dark rounded-0 mb-3">
								<div className="card-header">Album</div>
								<div className="card-body bg-dark">
									<Link
										href={{
											pathname: `/albums/${song?.data?.resourceId?._id}/${song?.data?.resourceId?.slug}`,
											query: {},
										}}
									>
										{song?.data?.resourceId?.title}
									</Link>
								</div>
							</div>
							<div className="card bg-black text-bg-dark rounded-0 mb-3">
								<div className="card-header">Songs</div>
								<div className="card-body bg-dark p-0">
									<div className="row row-cols-5 g-0">
										{songs?.data?.length > 0 &&
											songs?.data?.map((song, index) => (
												<div
													key={song._id}
													className={`col chapter-grid-link ${index + 1}`}
												>
													<Link
														href={{
															pathname: `/songs/${song?._id}/read`,
															query: {},
														}}
														className="d-block text-center p-1 border border-secondary text-decoration-none"
													>
														{song?.orderingNumber}
													</Link>
												</div>
											))}
									</div>
								</div>
							</div>
							<ExportModal
								object={song?.data}
								linkToShare={`/songs/${song?.data?._id}/read`}
								iconSize="45"
							/>
						</div>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default ReadSong;
