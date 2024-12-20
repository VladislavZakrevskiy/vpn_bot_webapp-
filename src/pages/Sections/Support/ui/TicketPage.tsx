import { MessageCard, Status, useGetTicketQuery } from "@/entities/Support";
import { PageLoader } from "@/widgets/PageLoader";
import { Headline, Text } from "@telegram-apps/telegram-ui";
import { useParams } from "react-router-dom";

const TicketPage = () => {
	const { id } = useParams<{ id: string }>();
	const { isLoading, data: ticket } = useGetTicketQuery(id!);

	if (isLoading) {
		return <PageLoader />;
	}

	if (!ticket) {
		return (
			<div>
				<Text>Простите такого тикета не существует</Text>
			</div>
		);
	}
	const { supporter, user, messages, created_at, status } = ticket;

	return (
		<div>
			<div className="flex justify-between">
				<Headline>{new Date(created_at).toLocaleString()}</Headline>
				<Headline>{status === Status.OPEN ? "Открыт ❌" : "Закрыт ✅"}</Headline>
			</div>
			<div className="grid grid-cols-2 gap-2">
				<div className="flex flex-cik gap-2">
					<Headline>Поддержка</Headline>
					<Text>{supporter.vpn.name}</Text>
					<Text>{supporter.id}</Text>
					<Text>{supporter.tg_id}</Text>
				</div>
				<div className="flex flex-cik gap-2">
					<Headline>Пользователь</Headline>
					<Text>{user.vpn.name}</Text>
					<Text>{user.id}</Text>
					<Text>{user.tg_id}</Text>
				</div>
			</div>
			<div>
				{messages.map((message) => (
					<MessageCard message={message} ticket={ticket} />
				))}
			</div>
		</div>
	);
};

export default TicketPage;
