import React from "react";
import { Card, Text } from "@telegram-apps/telegram-ui";
import { PageLoader } from "@/widgets/PageLoader";
import { DeleteModal } from "./DeleteModal";
import { useGetUsersQuery } from "@/entities/User";

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
							</div>
						</Card.Chip>
						<div className="flex flex-col gap-1 items-start p-4">
							<Text>ID: {user.id}</Text>
							<Text>UUID в VPN админке: {user.id}</Text>
							<Text>TG ID: {user.tg_id}</Text>
							<Text>Пробный потрачен: {user.was_trial ? "✅" : "❌"}</Text>
							<Text>Активна подписка: {user.is_active ? "✅" : "❌"}</Text>
							<Text>Куплено тарифов: {user.purchases.length}шт.</Text>
							<Text>Осталось дней: {user.vpn.package_days}</Text>
							<Text>Осталось тарифа: {user.vpn.usage_limit_GB - user.vpn.current_usage_GB}Гб</Text>
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
