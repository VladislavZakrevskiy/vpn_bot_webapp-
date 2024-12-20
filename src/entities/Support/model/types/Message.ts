import { User } from "@/entities/User";
import { Ticket } from "./Ticket";

export interface Message {
	id: string;
	text: string;
	type: MessageType;
	created_at: string;
	sended: boolean;
	user_id: string;
	user: User;
	ticket_id: string;
	ticket: Ticket;
}

export enum MessageType {
	TEXT = "TEXT",
	CLOSE = "CLOSE",
}
