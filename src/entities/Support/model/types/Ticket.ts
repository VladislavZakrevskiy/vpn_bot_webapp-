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
	tag: Tag
}

export interface Tag {
	id: string
	value: string
}

export enum Status {
	OPEN = "OPEN",
	CLOSE = "CLOSE",
}
