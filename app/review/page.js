import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/review/list";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getReviews(params) {
	const res = await fetchurl(`/global/comments${params}`, "GET", "no-cache");
	return res;
}

const ReviewIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const postType = awtdSearchParams.postType || "review";
	const rating =
		awtdSearchParams.rating !== undefined
			? `&rating=${awtdSearchParams.rating}`
			: "";

	const getReviewsData = getReviews(
		`?page=${page}&limit=${limit}&sort=${sort}&postType=${postType}&status=published${rating}&decrypt=true`
	);

	const [reviews] = await Promise.all([getReviewsData]);

	return settings?.data?.maintenance === false ? (
		<List
			objects={reviews}
			searchParams={awtdSearchParams}
			returtopageurl="/review"
		/>
	) : (
		<ErrorPage />
	);
};

export default ReviewIndex;
