import { rtkApi } from "@/shared/api/rtkApi";
import { Tag } from "../model/types/Ticket";

const supportApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getTags: build.query<Tag[], void>({
			query: () => "/tags",
		}),
		getTag: build.query<Tag, string>({
			query: (id) => "/tags/" + id,
		}),
		addTag: build.mutation<Tag, { value: string }>({
			query: (body) => ({
				url: "/tags",
				method: "POST",
				body,
			}),
		}),
		deleteTag: build.mutation<Tag, string>({
			query: (id) => ({
				url: "/tags/" + id,
				method: "DELETE",
			}),
		}),
		updateTag: build.mutation<Tag, { id: string; value: string }>({
			query: ({ id, ...body }) => ({
				url: "/tags/" + id,
				method: "PATCH",
				body,
			}),
		}),
		updateTags: build.mutation<Tag, { data: [id: string, value: string][] }>({
			query: (body) => ({
				url: "/tags",
				method: "PATCH",
				body,
			}),
		}),
	}),
});

export const {
	useAddTagMutation,
	useDeleteTagMutation,
	useGetTagQuery,
	useGetTagsQuery,
	useUpdateTagMutation,
	useUpdateTagsMutation,
} = supportApi;
