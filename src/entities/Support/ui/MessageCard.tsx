import { FC } from "react";
import { Message } from "../model/types/Message";
import { Ticket } from "../model/types/Ticket";
import { Caption, Card, Text } from "@telegram-apps/telegram-ui";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

interface MessageCardProps {
	message: Message;
	ticket: Ticket;
}

export const MessageCard: FC<MessageCardProps> = ({ message, ticket }) => {
	const { text, user_id } = message;
	const senderType = ticket.user_id === user_id ? "Пользователь" : "Поддержка";

	return (
		<Card className={(ticket.user_id === user_id ? "self-start " : "self-end ") + "my-1 min-w-[60%] max-w-[80%] p-2"}>
			<div className="flex flex-col items-start gap-1">
				<Caption className="flex gap-1 items-center">
					{ticket.user_id === user_id ? <FaRegUser /> : <MdOutlineSupportAgent />}
					{senderType}
				</Caption>
				<Text>{text}</Text>
			</div>
		</Card>
	);
};
