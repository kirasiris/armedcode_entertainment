import UpdateForm from "@/forms/api/updateform";
import { fetchurl, getAPITokenOnServer } from "@/helpers/fetchurl";
import Header from "@/layout/api/header";
import TabMenu from "@/layout/api/tabmenu";
import ErrorPage from "@/layout/errorpage";

async function getAuthenticatedUser() {
	const res = await fetchurl(`/auth/me`, "GET", "no-cache");
	return res;
}

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getWeapons(params) {
	const res = await fetchurl(`/protected/weapons${params}`, "GET", "no-cache");
	// if (!res.success) notFound();
	return res;
}

const ApiUpdate = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const auth = await getAuthenticatedUser();

	const apitoken = await getAPITokenOnServer();

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = 1;
	const limit = 5;
	const sort = "-createdAt";

	const getWeaponsData = getWeapons(
		`?user=${auth?.data?._id}&page=${page}&limit=${limit}&sort=${sort}&status=published&decrypt=true`
	);

	const [weapons] = await Promise.all([getWeaponsData]);

	return settings?.data?.maintenance === false ? (
		<section className="bg-black text-bg-dark py-5">
			<div className="container">
				<Header />
				<TabMenu />
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<div className="card-header">
						<h3>Update Weapon Records</h3>
						<p className="text-secondary">
							Modify existing NFA item information
						</p>
					</div>
					<div className="card-body">
						<UpdateForm
							apitoken={apitoken?.value}
							objects={weapons}
							params={awtdParams}
							searchParams={awtdSearchParams}
						/>
					</div>
				</div>
			</div>
		</section>
	) : (
		<ErrorPage />
	);
};

export default ApiUpdate;
