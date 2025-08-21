import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { fetchurl } from "@/helpers/fetchurl";
import Head from "@/app/head";
import ErrorPage from "@/layout/errorpage";
import FeaturedCarousel from "@/layout/carousel";
import ParseHtml from "@/layout/parseHtml";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getShows(params) {
	const res = await fetchurl(
		`/global/playlists/${params}&status=published&playlistType=video&decrypt=true`,
		"GET",
		"default"
	);
	return res;
}

async function getCdAlbums(params) {
	const res = await fetchurl(
		`/global/playlists/${params}&status=published&playlistType=audio&decrypt=true`,
		"GET",
		"default"
	);
	return res;
}

async function getChapters(params) {
	const res = await fetchurl(
		`/global/videos/${params}&status=published&decrypt=true`,
		"GET",
		"default"
	);
	return res;
}

async function getSongs(params) {
	const res = await fetchurl(
		`/global/songs/${params}&status=published&decrypt=true`,
		"GET",
		"default"
	);
	return res;
}

const Home = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	// Set cookies
	if (awtdSearchParams?.xAuthToken) {
		redirect(`/api/auth/set-token?xAuthToken=${awtdSearchParams?.xAuthToken}`);
	}

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);
	const featuredshows = await getShows(
		`?page=1&limit=3&sort=-createdAt&featured=true`
	);
	const shows = await getShows(`?page=1&limit=12&sort=-createdAt`);
	const albums = await getCdAlbums(`?page=1&limit=12&sort=-createdAt`);
	const chapters = await getChapters(`?page=1&limit=12&sort=-createdAt`);
	const songs = await getSongs(`?page=1&limit=12&sort=-createdAt`);

	return settings?.data?.maintenance === false ? (
		<>
			<Head
				title={settings.data.title}
				description={settings.data.text}
				favicon={settings.data.favicon}
				postImage={settings.data.showcase_image}
				imageWidth="800"
				imageHeight="450"
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url="/"
				author={settings.data.author}
				createdAt={settings.data.createdAt}
				updatedAt={settings.data.updatedAt}
				locales=""
				posType="website"
			/>
			{/* FEATURED SHOWS - CAROUSEL */}
			{featuredshows?.data?.length > 0 && (
				<FeaturedCarousel objects={featuredshows.data} />
			)}
			{/* SHOWS */}
			<section className="bg-dark text-bg-dark py-5">
				<div className="container">
					<div className="row mb-3">
						<div className="col-lg-12">
							<div className="d-flex justify-content-between">
								<h6>Current Shows</h6>

								<Link
									href={{
										pathname: `/shows`,
										query: {},
									}}
									className="btn btn-outline-light btn-sm"
								>
									View All Shows
								</Link>
							</div>
						</div>
					</div>
					<div className="row g-4">
						{shows?.data?.map((show, index) => (
							<article
								key={show._id}
								className={`col-xl-3 col-lg-4 col-md-6 col-12 mb-3 ${index}-${show._id}`}
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
											{show.onairtype}
										</span>
										<span
											className="badge position-absolute text-bg-light text-capitalize"
											style={{
												top: "5px",
												right: "5px",
											}}
										>
											{show.onairstatus}
										</span>
										<Image
											src={show.files?.avatar.location.secure_location}
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
											{show.category[0].title || "Undefined"}
										</span>
										<h5>{show.title}</h5>
										<ParseHtml text={show.excerpt} classList="card-text" />
									</div>
									<div className="card-footer">
										<Link
											href={{
												pathname: `/shows/${show._id}/${show.slug}`,
												query: {},
											}}
											className="btn btn-dark btn-sm w-100"
										>
											Continue Watching
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
			{/* MUSIC ALBUMS */}
			<section className="bg-dark text-bg-dark py-5">
				<div className="container">
					<div className="row mb-3">
						<div className="col-lg-12">
							<div className="d-flex justify-content-between">
								<h6>Music Albums</h6>

								<Link
									href={{
										pathname: `/albums`,
										query: {},
									}}
									className="btn btn-outline-light btn-sm"
								>
									View All Albums
								</Link>
							</div>
						</div>
					</div>
					<div className="row g-4">
						{albums?.data?.map((album, index) => (
							<article
								key={album._id}
								className={`col-xl-3 col-lg-4 col-md-6 col-12 mb-3 ${index}-${album._id}`}
							>
								<div className="card bg-orange text-bg-dark">
									<div>
										<span
											className="badge position-absolute text-bg-light text-capitalize"
											style={{
												top: "5px",
												left: "5px",
											}}
										>
											{album.onairtype}
										</span>
										<span
											className="badge position-absolute text-bg-light text-capitalize"
											style={{
												top: "5px",
												right: "5px",
											}}
										>
											{album.onairstatus}
										</span>
										<Image
											src={album.files?.avatar.location.secure_location}
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
											{album?.category[0]?.title || "Undefined"}
										</span>
										<h5>{album.title}</h5>
										<ParseHtml text={album?.excerpt} classList="card-text" />
									</div>
									<div className="card-footer">
										<Link
											href={{
												pathname: `/albums/${album._id}/${album.slug}`,
												query: {},
											}}
											className="btn btn-orange btn-sm w-100"
										>
											Continue Listening
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
			{/* EPISODES */}
			<section className="bg-dark text-bg-dark py-5">
				<div className="container">
					<div className="row mb-3">
						<div className="col-lg-12">
							<div className="d-flex justify-content-between">
								<h6>Recent Chapters</h6>

								<Link
									href={{
										pathname: `/chapters`,
										query: {},
									}}
									className="btn btn-outline-light btn-sm"
								>
									View All Chapters
								</Link>
							</div>
						</div>
					</div>
					<div className="row g-4">
						{chapters?.data?.map((chapter, index) => (
							<article
								key={chapter._id}
								className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-3 ${index}-${chapter._id}`}
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
											{chapter.onairtype}
										</span>
										<span
											className="badge position-absolute text-bg-light text-capitalize"
											style={{
												top: "5px",
												right: "5px",
											}}
										>
											{chapter.onairstatus}
										</span>
										<Image
											src={chapter.files?.avatar.location.secure_location}
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
										{/* <span className="badge text-bg-light text-capitalize">
											{chapter?.category[0]?.title || "Undefined"}
										</span> */}
										<h5>{chapter.title}</h5>
										<ParseHtml text={chapter.excerpt} classList="card-text" />
									</div>
									<div className="card-footer">
										<Link
											href={{
												pathname: `/shows/chapter/${chapter._id}/read`,
												query: {},
											}}
											className="btn btn-dark btn-sm w-100"
										>
											Continue Watching
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
			{/* SONGS */}
			<section className="bg-dark text-bg-dark py-5">
				<div className="container">
					<div className="row mb-3">
						<div className="col-lg-12">
							<div className="d-flex justify-content-between">
								<h6>Recent Songs</h6>
								<Link
									href={{
										pathname: `/songs`,
										query: {},
									}}
									className="btn btn-outline-light btn-sm"
								>
									View All Songs
								</Link>
							</div>
						</div>
					</div>
					<div className="row g-4">
						{songs?.data?.map((song, index) => (
							<article
								key={song._id}
								className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-3 ${index}-${song._id}`}
							>
								<div className="card bg-orange text-bg-dark">
									<div>
										<span
											className="badge position-absolute text-bg-light text-capitalize"
											style={{
												top: "5px",
												left: "5px",
											}}
										>
											{song.onairtype}
										</span>
										<span
											className="badge position-absolute text-bg-light text-capitalize"
											style={{
												top: "5px",
												right: "5px",
											}}
										>
											{song.onairstatus}
										</span>
										<Image
											src={
												// song.files?.avatar.location.secure_location ||
												"https://res.cloudinary.com/dgq2klit7/image/upload/v1755051683/6665c4a6658b7dc837479ea3-kirasiris-kuaf1998%40gmail.com/posts/61vjokq1gal-6665c4a6658b7dc837479ea3-kuaf1998-gmail-com.jpg.jpg"
											}
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
										<h5>{song.title}</h5>
										{/* <p className="card-text">
													<ParseHtml text={song.text} />
												</p> */}
									</div>
									<div className="card-footer">
										<Link
											href={{
												pathname: `/songs/${song._id}/${song.slug}`,
												query: {},
											}}
											className="btn btn-orange btn-sm w-100"
										>
											Continue Watching
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	) : (
		<ErrorPage />
	);
};

export default Home;
