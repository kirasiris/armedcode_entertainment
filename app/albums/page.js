import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/album/list";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getAlbums(params) {
	const res = await fetchurl(
		`/global/playlists${params}&status=published&playlistType=audio`,
		"GET",
		"no-cache",
	);
	return res;
}

async function getCategories(params) {
	const res = await fetchurl(`/global/categories${params}`, "GET", "no-cache");
	return res;
}

const AlbumsIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 36;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getAlbumsData = getAlbums(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`,
	);

	const albumcategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=album`,
	);

	const [albums] = await Promise.all([getAlbumsData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Albums`}
				description={"Find all the albums you might like!"}
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/albums`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<List
					objects={albums}
					secondaryobjects={[albumcategories]}
					searchedKeyword=""
					searchParams={awtdSearchParams}
				/>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default AlbumsIndex;
