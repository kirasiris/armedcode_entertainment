const robots = () => {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [],
		},
		sitemap: "https://armedcodellc.com/review/sitemap.xml",
	};
};

export default robots;
