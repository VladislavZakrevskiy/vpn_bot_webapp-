import { rtkApi } from "@/shared/api/rtkApi";
import { Ticket } from "../model/types/Ticket";
import { User } from "@/entities/User";

const supportApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getTickets: build.query<Ticket[], string[] | void>({
			query: (ids) => `/tickets/tickets${ids ? "?" + new URLSearchParams({ ids: ids.join("/\\") }).toString() : ""}`,
		}),
		getSupporters: build.query<User[], void>({
			query: () => "/tickets/supoorters",
		}),
		getTicket: build.query<Ticket, string>({
			query: (id) => `/tickets/ticket/${id}`,
		}),
	}),
});

export const { useGetSupportersQuery, useGetTicketsQuery, useGetTicketQuery, useLazyGetTicketsQuery } = supportApi;
