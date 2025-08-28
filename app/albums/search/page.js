import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/album/list";
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

async function getCategories(params) {
	const res = await fetchurl(`/global/categories${params}`, "GET", "no-cache");
	return res;
}

const AlbumsSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 36;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keyword = awtdSearchParams.keyword || "";
	const category =
		awtdSearchParams.category !== ""
			? `&category=${awtdSearchParams.category}`
			: "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getAlbumsData = getAlbums(
		`?page=${page}&limit=${limit}&sort=${sort}&keyword=${keyword}${category}${decrypt}`
	);

	const albumcategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=album`
	);

	const [albums] = await Promise.all([getAlbumsData]);

	return settings?.data?.maintenance === false ? (
		<List
			objects={albums}
			secondaryobjects={[albumcategories]}
			searchedKeyword={keyword}
			searchParams={awtdSearchParams}
		/>
	) : (
		<ErrorPage />
	);
};

export default AlbumsSearchIndex;
