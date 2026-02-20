import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/chapter/list";
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

async function getVideos(params) {
	const res = await fetchurl(
		`/global/videos${params}&status=published`,
		"GET",
		"no-cache",
	);
	return res;
}

const ChaptersSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword;
	const resourceId = awtdSearchParams.resourceId;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 36;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const resourceQuery = resourceId ? `&resourceId=${resourceId}` : "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getShowsData = getShows(`?page=1&sort=-createdAt`);

	const getVideosData = getVideos(
		`?page=${page}&limit=${limit}&sort=${sort}${resourceQuery}${keywordQuery}${decrypt}`,
	);

	const [shows, videos] = await Promise.all([getShowsData, getVideosData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Search results of ${awtdSearchParams.keyword}`}
				description={"Search results..."}
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/chapters/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<List
					objects={videos}
					secondaryobjects={shows}
					searchedKeyword={keyword}
					searchParams={awtdSearchParams}
				/>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default ChaptersSearchIndex;
