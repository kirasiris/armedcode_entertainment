import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/albums/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";

async function getAlbum(params) {
	const res = await fetchurl(`/global/playlists${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const AlbumRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const getAlbumsData = getAlbum(`/${awtdParams.id}`);

	const [album] = await Promise.all([getAlbumsData]);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	console.log("Album data in single page", album.data);

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={album.data.title}
				description={album.data.excerpt || album.data.text}
				// favicon=""
				postImage={album.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				// category={album.data.category.title}
				url={`/albums/${album.data._id}/${album.data.slug}`}
				author={album.data.user.name}
				createdAt={album.data.createdAt}
				updatedAt={album.data.updatedAt}
				locales=""
				posType="album"
			/>
			<div className="bg-black py-5 text-bg-dark">
				<div className="container">
					{album.data.status === "published" ||
					awtdSearchParams.isAdmin === "true" ? (
						<div className="row">
							<Globalcontent classList={`col-lg-12`}>
								<article>
									<figure>
										<Image
											className="img-fluid"
											src={
												album?.data?.files?.avatar?.location?.secure_location ||
												`https://source.unsplash.com/random/1200x900`
											}
											alt={`${album?.data?.files?.avatar?.location?.filename}'s featured image`}
											width={1200}
											height={900}
											priority
										/>
									</figure>
									<section>
										<ParseHtml text={album?.data?.text} />
										<div className="alert alert-danger">
											Comments are closed
										</div>
									</section>
								</article>
							</Globalcontent>
						</div>
					) : (
						<p>Not visible</p>
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default AlbumRead;
