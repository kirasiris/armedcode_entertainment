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

const ShowsIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 36;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getShowsData = getShows(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`,
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
				title={`${settings?.data?.title} - Shows`}
				description={"Find all the shows you might like!"}
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/shows`}
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
					searchParams={awtdSearchParams}
				/>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default ShowsIndex;
