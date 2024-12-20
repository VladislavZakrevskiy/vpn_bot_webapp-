import { FC } from "react";
import { Message } from "../model/types/Message";
import { Ticket } from "../model/types/Ticket";
import { Card } from "@telegram-apps/telegram-ui";

interface MessageCardProps {
	message: Message;
	ticket: Ticket;
}

export const MessageCard: FC<MessageCardProps> = ({ message, ticket }) => {
	const { text, user_id } = message;
	const senderType = ticket.user_id === user_id ? "Пользователь" : "Поддержка";

	return (
		<Card>
			<Card.Chip>{senderType}</Card.Chip>
			<div className="p-3">{text}</div>
		</Card>
	);
};
