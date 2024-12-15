import React from "react";
import { Caption, Card, Text } from "@telegram-apps/telegram-ui";
import { useGetRatesQuery } from "@/entities/Rate/api/rates.api";
import { PageLoader } from "@/widgets/PageLoader";
import { RateModal } from "./RateModal";
import { DeleteModal } from "./DeleteModal";

const RatesPage: React.FC = () => {
	const { data: rates, isLoading, refetch } = useGetRatesQuery();

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div>
			<div className="flex justify-end p-2">
				<RateModal refetch={refetch} mode="create" />
			</div>
			<div className="grid grid-cols-1 p-2 gap-2 ">
				{rates?.map((rate) => (
					<Card>
						<Card.Chip readOnly>{rate.price} RUB</Card.Chip>
						<div className="flex flex-col gap-1 items-start p-4">
							<Text>Срок: {rate.expiresIn} дней</Text>
							<Text>Лимит: {rate.GB_limit}ГБ</Text>
							<Text>Скорость: {rate.MB_speed}ГБит</Text>
							<Text>Макс. устройств: {rate.max_devices}</Text>
							<Text>Цена в ⭐: {rate.price_XTR}</Text>
						</div>
						<Card.Cell
							className="flex justify-between"
							readOnly
							subtitle={
								<div className="w-full flex items-start justify-between px-2 pt-4 overflow-visible">
									<Caption>{rate.description}</Caption>
									<div className="flex items-start gap-1">
										<RateModal refetch={refetch} rate={rate} mode="update" />
										<DeleteModal id={rate.id} refetch={refetch} />
									</div>
								</div>
							}
						>
							{rate.name}
						</Card.Cell>
					</Card>
				))}
			</div>
		</div>
	);
};

export default RatesPage;
