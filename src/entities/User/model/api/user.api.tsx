import { rtkApi } from "@/shared/api/rtkApi";
import { User } from "../types/User";
import { UserUpdateInput } from "../types/UserUpdateInput";

export interface Version {
	version: string;
}

export interface Response {
	msg: string;
}

export interface Health {
	version: Version;
	delete: Response;
	get: Response;
	patch: Response;
	post: Response;
	put: Response;
}

export const userApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		health: builder.query<Health, void>({
			query: () => "/vpn/health",
		}),

		getUsers: builder.query<User<true>[], void>({
			query: () => "/users",
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
				url: "/users/synchronize",
				method: "POST",
			}),
		}),
	}),
});

export const {
	useHealthQuery,
	useDeleteUserMutation,
	useGetUsersQuery,
	useSynchronizeUsersMutation,
	useUpdateUserMutation,
} = userApi;
