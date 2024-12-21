import { Button, Caption, Card, Text } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { Status, Ticket } from "../model/types/Ticket";
import { useNavigate } from "react-router-dom";
import { getRouteTicket } from "@/shared/consts/router";

interface TicketCardProps {
	ticket: Ticket;
}

export const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
	const { created_at, status, supporter, user } = ticket;
	const nav = useNavigate();

	return (
		<Card>
			<Card.Chip mode="outline" readOnly style={{ outline: "none", border: "none" }}>
				{status === Status.OPEN ? "Открыт ❌" : "Закрыт ✅"}
			</Card.Chip>

			<div className="flex flex-col gap-2 p-3">
				<Text>Поддержка</Text>
				<Caption>ID: {supporter.id}</Caption>
				<Caption>TG ID: {supporter.tg_id}</Caption>
				<Caption>Имя: {supporter.vpn.name}</Caption>

				<Text>Пользователь</Text>
				<Caption>ID: {user.id}</Caption>
				<Caption>TG ID: {user.tg_id}</Caption>
				<Caption>Имя: {user.vpn.name}</Caption>
			</div>

			<Card.Cell readOnly subtitle={new Date(created_at).toLocaleString()}>
				<Button onClick={() => nav(getRouteTicket(ticket.id))}>Перейти к сообщениям</Button>
			</Card.Cell>
		</Card>
	);
};
