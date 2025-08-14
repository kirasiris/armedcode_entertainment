import CreateForm from "@/forms/api/createform";
import { fetchurl, getAPITokenOnServer } from "@/helpers/fetchurl";
import Header from "@/layout/api/header";
import TabMenu from "@/layout/api/tabmenu";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

const ApiCreate = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const apitoken = await getAPITokenOnServer();

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	return settings?.data?.maintenance === false ? (
		<section className="bg-black text-bg-dark py-5">
			<div className="container">
				<Header />
				<TabMenu />
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<div className="card-header">
						<h3>Create a New Weapon Record</h3>
						<p className="text-secondary">
							Add a new NFA item to your collection
						</p>
					</div>
					<div className="card-body">
						<CreateForm apitoken={apitoken?.value} />
					</div>
				</div>
			</div>
		</section>
	) : (
		<ErrorPage />
	);
};

export default ApiCreate;
