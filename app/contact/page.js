import { Suspense } from "react";
import { fetchurl } from "@/helpers/fetchurl";
import ErrorPage from "@/layout/errorpage";
import ContactEmailForm from "@/forms/contact/contactemailform";
import Loading from "@/app/contact/loading";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

const ContactIndex = async () => {
	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	return settings?.data?.maintenance === false ? (
		<Suspense fallback={<Loading />}>
			<section className="bg-black text-bg-dark py-5">
				<div className="container">
					<h2 className="text-center">CONTACT US</h2>
					<p className="text-center text-secondary">
						Ready to get started? Reach out to discuss your NFA transfer or
						software development needs.
					</p>
					<div className="row">
						<div className="col-lg-6 mb-3">
							<div className="border border-1 my-border-color p-5 rounded">
								<h3>Send Us a Message</h3>
								<p className="text-secondary">
									Fill out the form below and we&apos;ll get back to you
									shortly.
								</p>
								<ContactEmailForm />
							</div>
						</div>
						<div className="col-lg-6 mb-3">
							<div className="border border-1 my-border-color p-5 rounded">
								<h3>Contact Information</h3>
								<p className="text-secondary">
									Reach out directly through any of these channels.
								</p>
								<ul className="list-unstyled">
									<li>
										<p className="fw-bold mb-0">Phone</p>
										<p className="text-secondary mb-0">682-375-9607</p>
										<p className="text-secondary">Monday-Friday, 9am-6pm</p>
									</li>
									<li>
										<p className="fw-bold mb-0">Email</p>
										<p className="text-secondary mb-0">
											{process.env.NEXT_PUBLIC_WEBSITE_EMAIL}
										</p>
										<p className="text-secondary">
											We&apos;ll respond within 24 hours
										</p>
									</li>
								</ul>
								<div className="bg-dark p-4 rounded">
									<h4>Business Hours</h4>
									<ul className="list-unstyled">
										<li className="d-flex justify-content-between">
											<span>Friday</span>
											<span>6:00 PM - 10:00 PM</span>
										</li>
										<li className="d-flex justify-content-between">
											<span>Saturday</span>
											<span>9:00 AM - 6:00 PM</span>
										</li>
										<li className="d-flex justify-content-between">
											<span>Sunday</span>
											<span>9:00 AM - 6:00 PM</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Suspense>
	) : (
		<ErrorPage />
	);
};

export default ContactIndex;
