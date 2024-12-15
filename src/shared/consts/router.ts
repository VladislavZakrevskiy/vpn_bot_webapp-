export enum AppRoutes {
	MAIN = "main",
	NOT_FOUND = "not_found",
	NOT_AUTH = "not_auth",
	SETTINGS = "settings",
	RATES = "rates"
}

export const getRouteMain = () => "/";
export const getRouteSettings = () => "/settings";
export const getRouteRates = () => "/rates"
export const getRouteNotAuth = () => "/not-auth";
export const getRouteNotFound = () => "*";
