import "@/src/css/bootstrap.css";
import "@/src/css/global.css";
import "@/src/css/app.css";
import Head from "@/app/head";
import Menu from "@/layout/menu";
import Footer from "@/layout/footer";
import { fetchurl } from "@/helpers/fetchurl";
import { AudioPlayerProvider } from "@/context/audioplayercontext";
import GlobalAudioPlayer from "@/layout/globalaudioplayer";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

const RootLayout = async ({ children }) => {
	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	return (
		<html lang="en">
			<head>
				<Head
					title={settings?.data?.title}
					description={settings?.data?.text}
					favicon={settings?.data?.favicon}
				/>
			</head>
			<body>
				<AudioPlayerProvider>
					<Menu
						title={settings?.data?.title}
						logo={settings?.data?.logo}
						canonical={process.env.NEXT_PUBLIC_WEBSITE_URL}
					/>
					<main>{children}</main>
					<Footer canonical={process.env.NEXT_PUBLIC_WEBSITE_URL} />
					<GlobalAudioPlayer />
				</AudioPlayerProvider>
			</body>
		</html>
	);
};

export default RootLayout;
