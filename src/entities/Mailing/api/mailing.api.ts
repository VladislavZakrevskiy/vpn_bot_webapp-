import { rtkApi } from "@/shared/api/rtkApi";

export const mailingApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		sendMailing: builder.mutation<void, { msg: string; ids: string[] }>({
			query: (body) => ({
				url: "/mailing",
				body,
                method: "POST"
			}),
		}),
	}),
});

export const {useSendMailingMutation} = mailingApi;
