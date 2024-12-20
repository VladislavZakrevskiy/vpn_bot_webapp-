import { User } from "@/entities/User";
import { Message } from "./Message";

export interface Ticket {
	id: string;
	status: Status;
	created_at: string;
	messages: Message[];
	supporter_id: string;
	user_id: string;
	supporter: User;
	user: User;
}

export enum Status {
	OPEN,
	CLOSE,
}
