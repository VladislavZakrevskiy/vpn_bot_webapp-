import { rtkApi } from "@/shared/api/rtkApi";
import { User } from "../types/User";
import { UserUpdateInput } from "../types/UserUpdateInput";

export const userApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<User<true>[], void>({
			query: () => "/rates",
		}),

		updateUser: builder.mutation<User, { where: { id: string }; data: UserUpdateInput }>({
			query: ({ where, data }) => ({
				url: `/users/${where.id}`,
				method: "PATCH",
				body: data,
			}),
		}),
		deleteUser: builder.mutation<User, { id: string }>({
			query: (where) => ({
				url: `/users/${where.id}`,
				method: "DELETE",
			}),
		}),

		synchronizeUsers: builder.mutation<void, User[]>({
			query: () => ({
				url: "/synchronize",
				method: "POST",
			}),
		}),
	}),
});

export const { useDeleteUserMutation, useGetUsersQuery, useSynchronizeUsersMutation, useUpdateUserMutation } = userApi;
