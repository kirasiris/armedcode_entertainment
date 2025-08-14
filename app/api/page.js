import Link from "next/link";
import { redirect } from "next/navigation";
import {
	deleteAuthTokenOnServer,
	fetchurl,
	getAPITokenOnServer,
} from "@/helpers/fetchurl";
import Header from "@/layout/api/header";
import TabMenu from "@/layout/api/tabmenu";
import ErrorPage from "@/layout/errorpage";
import YourApiKey from "@/components/api/yourapikey";
import JsonResponses from "@/components/global/jsonresponses";
import List from "@/components/memberships/list";

async function getAuthenticatedUser() {
	const res = await fetchurl(`/auth/me`, "GET", "no-cache");
	return res;
}

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getAPIMemberships(params) {
	const res = await fetchurl(
		`/extras/stripe/memberships${params}&sort=createdAt`,
		"GET",
		"default"
	);
	return res;
}

const ApiIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	// Set cookies
	if (awtdSearchParams?.xAuthToken) {
		redirect(`/api/auth/set-token?xAuthToken=${awtdSearchParams?.xAuthToken}`);
	}

	const auth = await getAuthenticatedUser();

	const apitoken = await getAPITokenOnServer();

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const memberships = await getAPIMemberships(
		`?active=true&status=published&project=armedcodellc&postType=api-usage&decrypt=true`
	);

	return settings?.data?.maintenance === false ? (
		<section className="bg-black text-bg-dark py-5">
			<div className="container">
				<Header />
				<TabMenu />
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<div className="card-header">
						<h3>
							<i aria-hidden className="fa-solid fa-circle-exclamation me-2" />
							Why We Created This API
						</h3>
						<p className="text-secondary">
							Understanding the need for a private weapons data API
						</p>
					</div>
					<div className="card-body">
						<p>
							There is no public API available for NFA weapons data due to
							several important reasons:
						</p>
						<div className="row mb-3">
							<div className="col-lg-6">
								<h4>
									<i aria-hidden className="fa-solid fa-shield me-2" />
									Privacy Concerns
								</h4>
								<p className="text-secondary">
									Information about NFA item ownership is sensitive and should
									be protected from public access.
								</p>
								<h4>
									<i aria-hidden className="fa-solid fa-database me-2" />
									Data Integrity
								</h4>
								<p className="text-secondary">
									Maintaining accurate data about regulated items requires
									strict access controls and validation.
								</p>
							</div>
							<div className="col-lg-6">
								<h4>
									<i aria-hidden className="fa-solid fa-lock me-2" />
									Security Risks
								</h4>
								<p className="text-secondary">
									Public APIs could potentially be exploited to identify NFA
									item owners, creating security risks.
								</p>
								<h4>
									<i aria-hidden className="fa-solid fa-key me-2" />
									Regulatory Compliance
								</h4>
								<p className="text-secondary">
									NFA items are strictly regulated, and data handling must
									comply with federal regulations.
								</p>
							</div>
							<div className="col-lg-12">
								<div className="bg-dark p-4 rounded">
									<h4>Our Solution</h4>
									<p className="text-secondary">
										We&apos;ve developed a private, secure API that allows FFL
										holders and collectors to manage their NFA items while
										maintaining privacy and security. Our API provides:
									</p>
									<ul className="list-unstyled">
										<li className="d-flex justify-content-start">
											<span className="me-5">Secure</span>
											<span>
												End-to-end encryption and secure authentication
											</span>
										</li>
										<li className="d-flex justify-content-start">
											<span className="me-5">Private</span>
											<span>Your data remains private and is never shared</span>
										</li>
										<li className="d-flex justify-content-start">
											<span className="me-5">Compliant</span>
											<span>Built with regulatory compliance in mind</span>
										</li>
										<li className="d-flex justify-content-start">
											<span className="me-5">Flexible</span>
											<span>
												Full CRUD operations for managing your collection
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<Link
							href={{
								pathname: `/api/create`,
								query: {},
							}}
							passHref
							legacyBehavior
						>
							<a className="btn btn-light btn-sm">Explore the API</a>
						</Link>
					</div>
				</div>
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<div className="card-header">
						<h3>
							<i aria-hidden className="fa-solid fa-key me-2" />
							Getting Started
						</h3>
						<p className="text-secondary">How to obtain and use your API key</p>
					</div>
					<div className="card-body">
						<p className="text-secondary">
							To use our API, you&apos;ll need to authenticate first to receive
							your AUTHENTICATION KEY. You will then be required to purchase a
							membership plan that fits your needs. Each plan provides different
							levels of API access.
						</p>
						<div className="row">
							<div className="col-lg-12 mb-3">
								<div className="bg-dark p-4 rounded">
									<h4>Authentication Required</h4>
									<p className="text-secondary">
										For security and compliance reasons, all users must complete
										the following steps:
									</p>
									<ol className="list-unstyled">
										<li>
											1. Create an account or sign in to your existing account
										</li>
										<li>
											2. Verify and activate your account to sign in to system
										</li>
										<li>3. Select a membership tier that fits your needs</li>
										<li>
											4. Accept the API terms of service and data usage
											agreement
										</li>
									</ol>
									{auth?.data?.isOnline ? (
										<form action={deleteAuthTokenOnServer}>
											<button className="btn btn-light btn-sm">Log Out</button>
										</form>
									) : (
										<a
											href={`${process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL}auth/login?returnpage=${process.env.NEXT_PUBLIC_WEBSITE_URL}/api`}
											className="btn btn-light btn-sm"
											target="_blank"
											rel="noreferrer noopener"
										>
											Sign In / Register to get Authentication Access
										</a>
									)}
								</div>
							</div>
							<List auth={auth} objects={memberships} />
							<div className="col-lg-12 mb-3">
								<div className="bg-dark p-4 rounded">
									<h4>Your SECRET API Key</h4>
									<div className="d-flex gap-2">
										<YourApiKey token={apitoken} />
									</div>
									<p className="text-secondary m-0">
										<strong>Important</strong>: Keep your API key secure and
										never share it publicly.
									</p>
								</div>
							</div>
							<div className="col-lg-12">
								<h4>Authentication</h4>
								<p className="text-secondary">
									Include your SECRET API key in the headers of all requests:
								</p>
								<div className="bg-dark p-4 rounded">
									<div className="d-flex gap-2">
										<JsonResponses
											text={`fetch('${
												process.env.NEXT_PUBLIC_API_URL
											}/protected/weapons', {
  method: "GET" || "POST" || "PUT",
  headers: {
    'armed_code_sk': '${apitoken?.value || "12345abcdef67890"}',
    'Content-Type': 'application/json'
  }
})`}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	) : (
		<ErrorPage />
	);
};

export default ApiIndex;
