export enum AppRoutes {
	MAIN = "main",
	NOT_FOUND = "not_found",
	NOT_AUTH = "not_auth",
	SETTINGS = "settings",
	RATES = "rates",
	USERS = "users",
	MAILING = "mailing",
	SUPPORT = "support",
	TICKET = "ticket",
}

export const getRouteMain = () => "/";
export const getRouteSettings = () => "/settings";
export const getRouteRates = () => "/rates";
export const getRouteNotAuth = () => "/not-auth";
export const getRouteNotFound = () => "*";
export const getRouteUsers = () => "/users";
export const getRouteMailing = () => "/mailing";
export const getRouteSupport = () => "/support";
export const getRouteTicket = (id: string) => "/ticket/" + id;
