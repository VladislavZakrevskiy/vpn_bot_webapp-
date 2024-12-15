import {
	AppRoutes,
	getRouteMain,
	getRouteNotFound,
	getRouteNotAuth,
	getRouteSettings,
	getRouteRates,
} from "@/shared/consts/router";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LazyMainPage } from "@/pages/MainPage";
import { AppRouteProps } from "@/shared/types/router";
import { LazyNotAuth } from "@/pages/NotAuth";
import { LazySettingsPage } from "@/pages/Sections/Settings";
import { LazyRatePage } from "@/pages/Sections/Rates";

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <LazyMainPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: getRouteNotFound(),
		element: <NotFoundPage />,
	},
	[AppRoutes.NOT_AUTH]: {
		path: getRouteNotAuth(),
		element: <LazyNotAuth />,
	},
	[AppRoutes.SETTINGS]: {
		path: getRouteSettings(),
		element: <LazySettingsPage />,
	},
	[AppRoutes.RATES]: {
		path: getRouteRates(),
		element: <LazyRatePage />,
	},
};
