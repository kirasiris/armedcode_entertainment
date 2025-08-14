import { fetchurl } from "@/helpers/fetchurl";

const Sitemap = async () => {
	const allReviews = await fetchurl(
		`/global/comments?limit=10&postType=review&status=published`,
		"GET",
		"no-cache"
	);

	const themes = allReviews.data.map((doc) => {
		return {
			url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/review/${doc._id}/${doc.slug}`,
			lastModified: doc.updatedAt,
		};
	});

	return [
		{
			title: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} | Review's Sitemap`,
			url: process.env.NEXT_PUBLIC_WEBSITE_URL,
			lastModified: new Date(),
		},
		...themes,
	];
};

export default Sitemap;
