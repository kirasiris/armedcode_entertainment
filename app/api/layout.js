import { CookiesProvider } from "next-client-cookies/server";

const APILayout = ({ children }) => {
	return <CookiesProvider>{children}</CookiesProvider>;
};

export default APILayout;
