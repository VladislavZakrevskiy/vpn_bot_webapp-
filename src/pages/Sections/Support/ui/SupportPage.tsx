import { Ticket, TicketCard, useGetSupportersQuery, useLazyGetTicketsQuery } from "@/entities/Support";
import { PageLoader } from "@/widgets/PageLoader";
import { Multiselect, Text } from "@telegram-apps/telegram-ui";
import { MultiselectOption } from "@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types";
import { useEffect, useState } from "react";

const SupportPage = () => {
	const { data: supporters, isLoading } = useGetSupportersQuery();
	const [getTickets, { isLoading: isTicketsLoading }] = useLazyGetTicketsQuery();
	const [selectedSupporters, setSelectedSupporters] = useState<MultiselectOption[]>([]);
	const [currentTickets, setTickets] = useState<Ticket[]>([]);

	useEffect(() => {
		const fetchTickets = async () => {
			if (selectedSupporters.length !== 0) {
				const tickets = await getTickets(selectedSupporters.map(({ value }) => value.toString()));
				if (tickets.data) {
					setTickets(tickets.data);
				}
			}
		};
		fetchTickets();
	}, [selectedSupporters]);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div>
			<Multiselect
				header="Персонал поддержки"
				options={supporters ? supporters.map(({ vpn: { name }, id }) => ({ label: name, value: id })) : []}
				value={selectedSupporters}
				onChange={(e) => setSelectedSupporters(e)}
				selectedBehavior="hide"
				filterFn={(input, user) => user.value.toString().includes(input)}
			/>
			{!isTicketsLoading ? (
				currentTickets.length === 0 ? (
					<div className="flex justify-center items-center">
						<Text>Тикетов нет</Text>
					</div>
				) : (
					<div>
						{currentTickets.map((ticket) => (
							<TicketCard ticket={ticket} />
						))}
					</div>
				)
			) : null}
		</div>
	);
};

export default SupportPage;
