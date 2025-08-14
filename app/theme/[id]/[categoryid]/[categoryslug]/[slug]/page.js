import { Suspense } from "react";
import { notFound } from "next/navigation";
import showdown from "showdown";
import base64 from "base-64";
import Loading from "@/app/theme/loading";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import ErrorPage from "@/layout/errorpage";
import ParseHtml from "@/layout/parseHtml";
import Sidebar from "@/layout/theme/sidebar";
import NotVisiblePage from "@/layout/notvisiblepage";
import Head from "@/app/head";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getTheme(params) {
	const res = await fetchurl(`/global/themes${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

async function getReadMe(repoName) {
	const response = await fetch(
		`https://api.github.com/repos/kirasiris/${repoName}/contents/README.md`,
		{
			method: "GET",
			accept: "application/vnd.github+json",
			headers: {
				Authorization: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
			},
			cache: "no-store",
		}
	)
		.then(async (res) => {
			if (!res.ok) {
				// check if there was JSON
				const contentType = res.headers.get("Content-Type");
				if (contentType && contentType.includes("application/json")) {
					// return a rejected Promise that includes the JSON
					return res.json().then((json) => Promise.reject(json));
				}
				// no JSON, just throw an error
				throw new Error("Something went horribly wrong 💩");
			}
			return res.json();
		})
		.then((data) => data)
		.catch((err) => {
			console.log(err);
			if (err.name === "AbortError") {
				console.log("successfully aborted");
			} else {
				// handle error
				console.log("Error coming from setTokenOnServer file", err);
			}
		});

	return response;
}

const ThemeRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const getThemesData = getTheme(`/${awtdParams.id}`);

	const [theme] = await Promise.all([getThemesData]);

	const readMeResponse = await getReadMe(theme.data.github_readme);

	const readMEDecoder = (text) => {
		const converter = new showdown.Converter();
		const readMEContentBase64 = base64.decode(text);
		const textConverted = converter.makeHtml(readMEContentBase64);
		return textConverted;
	};

	const readme = readMEDecoder(
		readMeResponse.content || "Tm8gcmVhZE1FIGZpbGU="
	);

	return settings?.data?.maintenance === false ? (
		<Suspense fallback={<Loading />}>
			<Head
				title={theme.data.title}
				description={theme.data.excerpt || theme.data.text}
				// favicon=""
				postImage={theme.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category={theme.data.category.title}
				url={`/theme/${theme.data._id}/${theme.data.category._id}/${theme.data.category.slug}/${theme.data.slug}`}
				author={theme.data.user.name}
				createdAt={theme.data.createdAt}
				updatedAt={theme.data.updatedAt}
				locales=""
				posType="theme"
			/>
			<section className="bg-dark py-5 text-bg-dark">
				<div className="container">
					{theme.data.status === "published" ||
					awtdSearchParams.isAdmin === "true" ? (
						<div className="row">
							<Globalcontent containerClasses={`col-lg-8`}>
								<article>
									{/* HERE GOES THE ARTICLE HEADER */}
									{/* HERE GOES THE FIGURE */}
									<section className="mb-5">
										<ParseHtml text={theme.data.text} />
										<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
											<div className="card-header">ReadMe.md</div>
											<div className="card-body">
												<ParseHtml text={readme} />
											</div>
										</div>
										{/* HERE GOES THE NEWSLETTER FORM */}
										<div className="float-start">
											{/* HERE GOES THE EXPORT MODAL */}
										</div>
										<div className="float-end">
											{/* HERE GOES THE REPORT MODAL */}
										</div>
										<div style={{ clear: "both" }} />
										{/* HERE GOES THE AUTHORBOX */}
										{/* HERE GOES THE COMMENTFORM AND COMMENTBOX */}
									</section>
								</article>
							</Globalcontent>
							<Sidebar object={theme} />
						</div>
					) : (
						<NotVisiblePage />
					)}
				</div>
			</section>
		</Suspense>
	) : (
		<ErrorPage />
	);
};

export default ThemeRead;
