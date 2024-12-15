import { rtkApi } from "@/shared/api/rtkApi";
import { Settings } from "../model/types/Settings";

const settingApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getSettings: build.query<Settings, void>({
			query: () => `/settings`,
		}),
		updateSettings: build.mutation<Settings, Partial<Settings>>({
			query: (body) => ({
				url: "/settings",
				method: "PATCH",
				body,
			}),
		}),
	}),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingApi;
