import React from "react";
import { Caption, Card } from "@telegram-apps/telegram-ui";
import { PageLoader } from "@/widgets/PageLoader";
import { DeleteModal } from "./DeleteModal";
import { useGetUsersQuery } from "@/entities/User";
import { Role } from "@/entities/User/model/types/User";
import { RoleModal } from "./RoleModal";

const UserPage: React.FC = () => {
	const { data: users, isLoading, refetch } = useGetUsersQuery();

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div>
			<div className="grid grid-cols-1 p-2 gap-2 ">
				{users?.map((user) => (
					<Card>
						<Card.Chip mode="outline" readOnly style={{ outline: "none", border: "none" }}>
							<div className="flex items-start gap-1">
								<DeleteModal id={user.id} refetch={refetch} />
								<RoleModal id={user.id} refetch={refetch} />
							</div>
						</Card.Chip>
						<div className="flex flex-col gap-1 items-start p-4 max-w-[75%]">
							<Caption>ID: {user.id}</Caption>
							<Caption>UUID в VPN админке: {user.id}</Caption>
							<Caption>TG ID: {user.tg_id}</Caption>
							<Caption>Пробный потрачен: {user.was_trial ? "✅" : "❌"}</Caption>
							<Caption>Активна подписка: {user.is_active ? "✅" : "❌"}</Caption>
							<Caption>Осталось дней: {user.vpn.package_days}</Caption>
							<Caption>Осталось тарифа: {user.vpn.usage_limit_GB - user.vpn.current_usage_GB}Гб</Caption>
							<Caption>
								Роль:
								{user.role === Role.SUPPORT
									? "Ответственный за тикеты"
									: user.role === Role.USER
										? "Пользователь"
										: "Админ"}
							</Caption>
						</div>
						<Card.Cell className="flex justify-between" readOnly>
							{user.vpn.name}
						</Card.Cell>
					</Card>
				))}
			</div>
		</div>
	);
};

export default UserPage;
