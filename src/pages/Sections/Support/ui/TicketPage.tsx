import { MessageCard, Status, useGetTicketQuery } from "@/entities/Support";
import { PageLoader } from "@/widgets/PageLoader";
import { Caption, Headline, IconButton, Text } from "@telegram-apps/telegram-ui";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const TicketPage = () => {
	const { id } = useParams<{ id: string }>();
	const { isLoading, data: ticket } = useGetTicketQuery(id!);
	const nav = useNavigate();

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
		<div className="p-3">
			<div className="flex gap-3 items-center mb-2">
				<IconButton onClick={() => nav(-1)}>
					<IoMdArrowBack />
				</IconButton>
				<div className="flex-1 flex justify-between">
					<Text>{new Date(created_at).toLocaleString()}</Text>
					<Text>{status === Status.OPEN ? "Открыт ❌" : "Закрыт ✅"}</Text>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2 mb-2">
				<div className="flex flex-col gap-2">
					<Headline>Поддержка</Headline>
					<Caption>Имя: {supporter.vpn.name}</Caption>
					<Caption>ID: {supporter.id}</Caption>
					<Caption>TG ID: {supporter.tg_id}</Caption>
				</div>
				<div className="flex flex-col gap-2">
					<Headline>Пользователь</Headline>
					<Caption>{user.vpn.name}</Caption>
					<Caption>{user.id}</Caption>
					<Caption>{user.tg_id}</Caption>
				</div>
			</div>
			{messages.length === 0 && (
				<div className="flex justify-center items-center">
					<Text>Сообщений нет</Text>
				</div>
			)}
			{messages.map((message) => (
				<div className="flex flex-col">
					<MessageCard message={message} ticket={ticket} />
				</div>
			))}
		</div>
	);
};

export default TicketPage;
