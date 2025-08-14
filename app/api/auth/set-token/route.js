import {
	fetchurl,
	getAPITokenOnServer,
	getAuthTokenOnServer,
	setAPITokenOnServer,
	setAuthTokenOnServer,
	setUserOnServer,
} from "@/helpers/fetchurl";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);

	// Get tokens from cookies and URL params
	const tokenFromCookie = await getAuthTokenOnServer();
	const tokenFromUrl = searchParams.get("xAuthToken");

	const secretTokenFromCookie = await getAPITokenOnServer();
	const secretTokenFromUrl = searchParams.get("armed_code_sk");

	console.dir({
		"token from cookie": tokenFromCookie?.value,
		"token from url": tokenFromUrl,
		"secret token from cookie": secretTokenFromCookie?.value,
		"secret token from url": secretTokenFromUrl,
	});

	// Redirect to a clean URL without token for security
	const response = NextResponse.redirect(new URL("/api", req.url));

	// Set cookies only if a valid token is found
	if (tokenFromUrl || tokenFromCookie?.value) {
		await setAuthTokenOnServer(tokenFromUrl || tokenFromCookie.value);
	}

	if (secretTokenFromUrl || secretTokenFromCookie?.value) {
		await setAPITokenOnServer(
			secretTokenFromUrl || secretTokenFromCookie.value
		);
	}

	const user = await fetchurl(`/auth/me`, "GET", "default");

	await setUserOnServer(user.data);

	return response;
}
