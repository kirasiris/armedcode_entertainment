import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/blog/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";

async function getBlog(params) {
	const res = await fetchurl(`/global/blogs${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const BlogRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const getBlogsData = getBlog(`/${awtdParams.id}`);

	const [blog] = await Promise.all([getBlogsData]);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={blog.data.title}
				description={blog.data.excerpt || blog.data.text}
				// favicon=""
				postImage={blog.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category={blog.data.category.title}
				url={`/blog/${blog.data._id}/${blog.data.category._id}/${blog.data.category.slug}/${blog.data.slug}`}
				author={blog.data.user.name}
				createdAt={blog.data.createdAt}
				updatedAt={blog.data.updatedAt}
				locales=""
				posType="blog"
			/>
			<div className="bg-black py-5 text-bg-dark">
				<div className="container">
					{blog.data.status === "published" ||
					awtdSearchParams.isAdmin === "true" ? (
						<div className="row">
							<Globalcontent classList={`col-lg-12`}>
								<article>
									<figure>
										<Image
											className="img-fluid"
											src={
												blog?.data?.files?.avatar?.location?.secure_location ||
												`https://source.unsplash.com/random/1200x900`
											}
											alt={`${blog?.data?.files?.avatar?.location?.filename}'s featured image`}
											width={1200}
											height={900}
											priority
										/>
									</figure>
									<section>
										<ParseHtml text={blog?.data?.text} />
										<div className="alert alert-danger">
											Comments are closed
										</div>
									</section>
								</article>
							</Globalcontent>
						</div>
					) : (
						<p>Not visible</p>
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default BlogRead;
