import { Ticket, TicketCard, useGetSupportersQuery, useLazyGetTicketsQuery } from "@/entities/Support";
import { PageLoader } from "@/widgets/PageLoader";
import { Multiselect, Spinner, Text } from "@telegram-apps/telegram-ui";
import { MultiselectOption } from "@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SupportPage = () => {
	const { data: supporters, isLoading } = useGetSupportersQuery();
	const [getTickets, { isLoading: isTicketsLoading }] = useLazyGetTicketsQuery();
	const [selectedSupporters, setSelectedSupporters] = useState<MultiselectOption[]>([]);
	const [currentTickets, setTickets] = useState<Ticket[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const fetchTickets = async () => {
			if (selectedSupporters.length !== 0) {
				const tickets = await getTickets(selectedSupporters.map(({ value }) => value.toString()));
				if (tickets.data) {
					setTickets(tickets.data);
				}
			} else {
				const tickets = await getTickets();
				if (tickets.data) {
					setTickets(tickets.data);
				}
			}
		};
		fetchTickets();
	}, [selectedSupporters]);

	useEffect(() => {
		const ids = searchParams.get("ids")?.split("/\\");
		if (supporters && ids && ids.length !== 0) {
			setSelectedSupporters(
				ids.map((value) => ({ value, label: supporters.find(({ id }) => id === value)?.vpn.name || "Не распознан" })),
			);
		} else {
			setSelectedSupporters([]);
		}
	}, [supporters, searchParams]);

	const onSelect = (e: MultiselectOption[]) => {
		if (e.length === 0) {
			setSearchParams();
			return;
		}
		// setSelectedSupporters(e);
		setSearchParams(new URLSearchParams({ ids: e.map(({ value }) => value.toString()).join("/\\") }));
	};

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div>
			<Multiselect
				status="focused"
				header="Ответственные за тикеты"
				options={supporters ? supporters.map(({ vpn: { name }, id }) => ({ label: name, value: id })) : []}
				value={selectedSupporters}
				onChange={onSelect}
				selectedBehavior="hide"
				filterFn={(input, user) => user.value.toString().includes(input)}
			/>
			{!isTicketsLoading ? (
				currentTickets.length === 0 ? (
					<div className="flex justify-center items-center p-2">
						<Text>Тикетов нет</Text>
					</div>
				) : (
					<div className="p-3 flex flex-col gap-2 items-stretch justify-center">
						{currentTickets.map((ticket) => (
							<TicketCard ticket={ticket} />
						))}
					</div>
				)
			) : (
				<div className="flex justify-center items-center ">
					<Spinner size="l" />
				</div>
			)}
		</div>
	);
};

export default SupportPage;
