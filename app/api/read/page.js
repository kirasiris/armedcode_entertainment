"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { checkEmptyObject } from "befree-utilities";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import List from "@/components/api/list";
import JsonResponses from "@/components/global/jsonresponses";
import { fetchurl } from "@/helpers/fetchurl";
import Header from "@/layout/api/header";
import TabMenu from "@/layout/api/tabmenu";
import ParseHtml from "@/layout/parseHtml";

const ApiReadSingle = () => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();
	const cookies = useCookies();
	const apitoken = cookies.get("armed_code_sk");

	const [auth, setAuth] = useState({});
	const [weapon, setWeapon] = useState({});
	const [weapons, setWeapons] = useState([]);
	const [loadingAuth, setLoadingAuth] = useState(true);
	const [loading, setLoading] = useState(true);
	const [loadingWeapons, setLoadingWeapons] = useState(true);

	// Fetch authenticated user
	useEffect(() => {
		const abortController = new AbortController();
		const fetchAuthenticatedUser = async () => {
			try {
				const res = await fetchurl(
					`/auth/me`,
					"GET",
					"default",
					{},
					abortController.signal,
					false,
					false
				);
				if (res?.data) {
					setAuth(res.data);
					setLoadingAuth(false);
				} else {
					throw new Error("Authentication failed");
				}
			} catch (err) {
				toast.error("Failed to authenticate user");
			}
		};
		fetchAuthenticatedUser();
		return () => abortController.abort();
	}, []);

	// Fetch all weapons
	useEffect(() => {
		if (!auth?._id || loadingAuth) return;

		const abortController = new AbortController();
		const fetchWeapons = async () => {
			try {
				const res = await fetchurl(
					`/protected/weapons?user=${auth._id}&page=1&limit=5&sort=-createdAt&status=published&decrypt=true`,
					"GET",
					"default",
					{},
					abortController.signal,
					false,
					false
				);
				if (res?.data) {
					if (checkEmptyObject(searchParams)) setWeapon(res.data[0]);
					setWeapons(res.data);
					toast.success("Weapons loaded successfully");
				} else {
					throw new Error("No weapon data returned");
				}
			} catch (err) {
				toast.error("Failed to fetch weapons");
			} finally {
				setLoading(false);
				setLoadingWeapons(false);
			}
		};

		fetchWeapons();
		return () => abortController.abort();
	}, []);

	// Fetch single weapon
	useEffect(() => {
		if (checkEmptyObject(searchParams)) return;

		const abortController = new AbortController();
		const fetchWeapon = async () => {
			setLoading(true);
			try {
				const res = await fetchurl(
					`/protected/weapons/${searchParams._id}`,
					"GET",
					"default",
					{},
					abortController.signal,
					false,
					false
				);
				if (res?.data) {
					setWeapon(res.data);
					toast.success("Weapon loaded successfully");
				} else {
					router.push(`/api/read`, { scroll: false });
				}
			} catch (err) {
				toast.error("Failed to fetch weapon");
			} finally {
				setLoading(false);
			}
		};

		fetchWeapon();
		return () => abortController.abort();
	}, [searchParams._id]);

	const memoizedWeapons = useMemo(() => weapons, [weapons]);

	return (
		<section className="bg-black text-bg-dark py-5">
			<div className="container">
				<Header />
				<TabMenu />
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<div className="card-header">
						<h3>Retrieve Weapon Records</h3>
						<p className="text-secondary">
							View and search your NFA item collection
						</p>
					</div>
					<div className="card-body">
						<div className="row">
							<div className="col-lg-6">
								<div className="bg-dark p-4 mb-3 rounded">
									<p>Your Weapons Collection</p>
									{loadingWeapons ? (
										<Skeleton count={5} height={30} className="mb-2" />
									) : (
										<List
											objects={memoizedWeapons}
											params={params}
											searchParams={searchParams}
											router={router}
										/>
									)}
								</div>
								{loading ? (
									<Skeleton count={8} height={20} className="mb-2" />
								) : (
									<div className="bg-dark p-4 mb-3 rounded">
										<p>Selected Weapon Details</p>
										<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
											<div className="card-header d-flex justify-content-between align-items-center">
												<div>
													<small className="text-secondary">Manufacturer</small>
													<p className="mb-1">
														{weapon?.manufacturer || "No manufacturer"}
													</p>
													<small className="text-secondary">Type</small>
													<p className="mb-1">{weapon?.type || "No type"}</p>
													<small className="text-secondary">
														Serial Number
													</small>
													<p className="mb-1">
														{weapon?.serialNumber || "No serial number"}
													</p>
												</div>
												<div>
													<small className="text-secondary">Model</small>
													<p className="mb-0">{weapon?.title || "No model"}</p>
													<small className="text-secondary">Caliber</small>
													<p className="mb-0">
														{weapon?.caliber || "No caliber"}
													</p>
													<small className="text-secondary">
														NFA Classification
													</small>
													<p className="mb-0">
														{weapon?.nfaClassification ||
															"No NFA classification"}
													</p>
												</div>
											</div>
											<div className="card-body">
												<small className="text-secondary">Notes</small>
												<ParseHtml
													text={weapon?.text || "No text"}
													parseAs="p"
												/>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className="col-lg-6">
								<p>API Reference</p>
								<div className="bg-dark p-4 mb-3 rounded">
									<h6>
										<span className="badge rounded-pill text-bg-light me-2">
											GET
										</span>
										/v1/weapons
									</h6>
									<p className="text-secondary">
										Retrieves all weapons in your collection.
									</p>
									<div className="d-flex gap-2">
										<JsonResponses
											text={`fetch('${
												process.env.NEXT_PUBLIC_API_URL
											}/protected/weapons', {
  method: "GET",
  headers: {
    'armed_code_sk': ${apitoken || "12345abcdef67890"},
    'Content-Type': 'application/json'
  },
})`}
										/>
									</div>
								</div>
								<div className="bg-dark p-4 mb-3 rounded">
									<h6>
										<span className="badge rounded-pill text-bg-light me-2">
											GET
										</span>
										/v1/protected/weapons/:id
									</h6>
									<p className="text-secondary">
										Retrieves a specific weapon by ID.
									</p>
									<div className="d-flex gap-2">
										<JsonResponses
											text={`fetch('${
												process.env.NEXT_PUBLIC_API_URL
											}/protected/weapons/${searchParams._id}', {
  method: "GET",
  headers: {
    'armed_code_sk': ${apitoken || "12345abcdef67890"},
    'Content-Type': 'application/json'
  },
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
	);
};

export default ApiReadSingle;
