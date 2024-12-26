export { MessageType } from "./model/types/Message";
export type { Message } from "./model/types/Message";
export { Status } from "./model/types/Ticket";
export type { Ticket } from "./model/types/Ticket";
export { MessageCard } from "./ui/MessageCard";
export { TicketCard } from "./ui/TIcketCard";

export {
	useAddTagMutation,
	useDeleteTagMutation,
	useGetTagQuery,
	useGetTagsQuery,
	useUpdateTagMutation,
	useUpdateTagsMutation,
} from "./api/tags.api";
export {
	useGetSupportersQuery,
	useGetTicketQuery,
	useGetTicketsQuery,
	useLazyGetTicketsQuery,
} from "./api/support.api";
