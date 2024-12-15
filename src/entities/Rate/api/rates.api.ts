import { Rate } from "../model/types/Rate";
import { RateCreateInput } from "../model/types/dto/RateCreate";
import { RateUpdateInput } from "../model/types/dto/RateUpdate";
import { rtkApi } from "@/shared/api/rtkApi";

export const ratesApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getRates: builder.query<Rate[], void>({
			query: () => "/rates",
		}),
		getRateByQuery: builder.query<Rate | null, RateUpdateInput>({
			query: (where) => ({
				url: "/rates/query", // Обратите внимание на маршрут, соответствующий контроллеру
				params: where,
			}),
		}),
		addRate: builder.mutation<Rate, RateCreateInput>({
			query: (body) => ({
				url: "/rates",
				method: "POST",
				body,
			}),
		}),
		updateRate: builder.mutation<Rate, { where: { id: string }; data: RateUpdateInput }>({
			query: ({ where, data }) => ({
				url: `/rates/${where.id}`,
				method: "PATCH",
				body: data,
			}),
		}),
		deleteRate: builder.mutation<Rate, { id: string }>({
			query: (where) => ({
				url: `/rates/${where.id}`,
				method: "DELETE",
			}),
		}),
		deleteAllRates: builder.mutation<void, void>({
			query: () => ({
				url: "/rates",
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetRatesQuery,
	useGetRateByQueryQuery,
	useAddRateMutation,
	useUpdateRateMutation,
	useDeleteRateMutation,
	useDeleteAllRatesMutation,
} = ratesApi;
