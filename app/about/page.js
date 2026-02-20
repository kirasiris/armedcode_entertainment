import { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDateWithoutTime } from "befree-utilities";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import NotVisiblePage from "@/layout/notvisiblepage";
import ErrorPage from "@/layout/errorpage";
import Loading from "@/app/about/loading";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getPage(params) {
	const res = await fetchurl(`/global/pages${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const AboutIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const { settings } = await getGlobalData();

	const page = await getPage(`/${process.env.NEXT_PUBLIC_ABOUT_PAGE_ID}`);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - ${page.data.title}`}
				description={settings.data.text}
				favicon={settings.data.favicon}
				postImage={settings.data.showcase_image}
				imageWidth="800"
				imageHeight="450"
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url="/about"
				author={settings.data.author}
				createdAt={settings.data.createdAt}
				updatedAt={settings.data.updatedAt}
				locales=""
				posType="website"
			/>
			{settings?.data?.maintenance === false ? (
				<>
					<Suspense fallback={<Loading />}>
						<section className="bg-dark py-5 text-bg-dark">
							<div className="container">
								{page.data.status === "published" ||
								awtdParams.isAdmin === "true" ? (
									<div className="row">
										<div className="col-lg-12">
											<article>
												<div className="mb-3">
													<h1>{page?.data?.title}</h1>
													<div className="text-muted fst-italic mb-2">
														Posted&nbsp;on&nbsp;
														{formatDateWithoutTime(page?.data?.createdAt)}
														{page?.data?.user?.username && (
															<>
																&nbsp;by&nbsp;
																{page?.data?.user?.username}
															</>
														)}
													</div>
												</div>
												<ParseHtml text={page?.data?.text} />
											</article>
										</div>
									</div>
								) : (
									<NotVisiblePage />
								)}
							</div>
						</section>
					</Suspense>
				</>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default AboutIndex;
