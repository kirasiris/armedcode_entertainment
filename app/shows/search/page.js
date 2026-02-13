import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/show/list";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getShows(params) {
	const res = await fetchurl(
		`/global/playlists${params}&status=published&playlistType=video`,
		"GET",
		"no-cache",
	);
	return res;
}

async function getCategories(params) {
	const res = await fetchurl(`/global/categories${params}`, "GET", "no-cache");
	return res;
}

const ShowsSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 36;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const categoryQuery =
		awtdSearchParams.category !== "" && awtdSearchParams.category !== undefined
			? `&category=${awtdSearchParams.category}`
			: "";
	const onairtypeQuery =
		awtdSearchParams.onairtype !== `` &&
		awtdSearchParams.onairtype !== undefined
			? `&onairtype=${awtdSearchParams.onairtype}`
			: "";
	const onairstatusQuery =
		awtdSearchParams.onairstatus !== `` &&
		awtdSearchParams.onairstatus !== undefined
			? `&onairstatus=${awtdSearchParams.onairstatus}`
			: "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getShowsData = getShows(
		`?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${categoryQuery}${onairtypeQuery}${onairstatusQuery}${decrypt}`,
	);

	const animecategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=anime`,
	);

	const tvcategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=tv`,
	);

	const moviecategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=movie`,
	);

	const specialcategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=special`,
	);

	const ovacategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=ova`,
	);

	const videocategories = await getCategories(
		`?page=${page}&limit=${limit}&sort=${sort}&categoryType=video`,
	);

	const [shows] = await Promise.all([getShowsData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Search results of ${awtdSearchParams.keyword}`}
				description={"Search results..."}
				favicon={settings?.data?.favicon}
				postImage=""
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/shows/search?page=${page}&limit=${limit}&sort=${sort}&keyword=${awtdSearchParams.keyword}`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
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
			)}
		</>
	);
};

export default ShowsSearchIndex;
