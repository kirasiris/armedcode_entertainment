"use client";
import Link from "next/link";
import Image from "next/image";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import { toast } from "react-toastify";
import { useAudioPlayer } from "@/context/audioplayercontext";

const AlbumList = ({ objects = [] }) => {
	const { playSong } = useAudioPlayer();
	const handlePlayAlbum = async (albumId) => {
		const res = await fetchurl(
			`/global/songs?resourceId=${albumId}`,
			"GET",
			"no-cache"
		);
		if (!res.success) toast.error("Not possible to play album", "bottom");
		if (res?.data?.length > 0) playSong(res?.data[0], res?.data, 0);
	};
	return objects?.data?.map((album, index) => (
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
					<Link
						href={{
							pathname: `/albums/${album?._id}/${album?.slug}`,
							query: {},
						}}
					>
						<h5>{album.title}</h5>
					</Link>
					<ParseHtml text={album?.excerpt} classList="card-text" />
				</div>
				<div className="card-footer">
					<button
						className="btn btn-orange btn-sm w-100"
						onClick={() => handlePlayAlbum(album?._id)}
					>
						▶ Play
					</button>
				</div>
			</div>
		</article>
	));
};

export default AlbumList;
