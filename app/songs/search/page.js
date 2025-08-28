import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/song/list";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getAlbums(params) {
	const res = await fetchurl(
		`/global/playlists${params}&status=published&playlistType=audio`,
		"GET",
		"no-cache"
	);
	return res;
}

async function getSongs(params) {
	const res = await fetchurl(
		`/global/songs${params}&status=published`,
		"GET",
		"no-cache"
	);
	return res;
}

const SongsSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword;
	const resourceId = awtdSearchParams.resourceId;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 36;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const resourceQuery = resourceId ? `&resourceId=${resourceId}` : "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getAlbumsData = getAlbums(`?page=1&sort=-createdAt`);

	const getSongsData = getSongs(
		`?page=${page}&limit=${limit}&sort=${sort}${resourceQuery}${keywordQuery}${decrypt}`
	);

	const [albums, songs] = await Promise.all([getAlbumsData, getSongsData]);

	return settings?.data?.maintenance === false ? (
		<List
			objects={songs}
			secondaryobjects={albums}
			searchedKeyword={keyword}
			searchParams={awtdSearchParams}
		/>
	) : (
		<ErrorPage />
	);
};

export default SongsSearchIndex;
