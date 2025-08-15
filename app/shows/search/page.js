import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/show/list";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getShows(params) {
	const res = await fetchurl(
		`/global/playlists/${params}&status=published&playlistType=video`,
		"GET",
		"no-cache"
	);
	return res;
}

async function getCategories(params) {
	const res = await fetchurl(`/global/categories${params}`, "GET", "no-cache");
	return res;
}

const ShowsSearchIndex = async ({ params, searchParams }) => {
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
	const onairstatus =
		awtdSearchParams.onairstatus !== ``
			? `&onairstatus=${awtdSearchParams.onairstatus}`
			: "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getShowsData = getShows(
		`?page=${page}&limit=${limit}&sort=${sort}&keyword=${keyword}${category}${onairstatus}${decrypt}`
	);

	const animecategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=anime`
	);

	const tvcategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=tv`
	);

	const moviecategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=movie`
	);

	const specialcategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=special`
	);

	const ovacategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=ova`
	);

	const videocategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=video`
	);

	const [shows] = await Promise.all([getShowsData]);

	return settings?.data?.maintenance === false ? (
		<List
			objects={shows}
			categories={[
				animecategories,
				tvcategories,
				moviecategories,
				specialcategories,
				ovacategories,
				videocategories,
			]}
			searchedKeyword={keyword}
			searchParams={awtdSearchParams}
		/>
	) : (
		<ErrorPage />
	);
};

export default ShowsSearchIndex;
