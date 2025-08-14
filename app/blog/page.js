import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/blog/list";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getBlogs(params) {
	const res = await fetchurl(
		`/global/blogs${params}&category=${process.env.NEXT_PUBLIC_ARMED_CODE_LLC_CATEGORY_ID}`,
		"GET",
		"no-cache"
	);
	return res;
}

const BlogIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const postType = awtdSearchParams.postType || "blog";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getBlogsData = getBlogs(
		`?page=${page}&limit=${limit}&sort=${sort}&postType=${postType}&status=published${decrypt}`
	);

	const [blogs] = await Promise.all([getBlogsData]);

	return settings?.data?.maintenance === false ? (
		<List objects={blogs} searchParams={awtdSearchParams} />
	) : (
		<ErrorPage />
	);
};

export default BlogIndex;
