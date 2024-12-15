import { Cell, IconButton, IconContainer, Modal, Section } from "@telegram-apps/telegram-ui";
import { MdOutlineMenu } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getRouteRates, getRouteSettings } from "@/shared/consts/router";
import { useState } from "react";
import { FaMoneyBill } from "react-icons/fa";

export const SideBar = () => {
	const nav = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const onNav = (route: string) => () => {
		setIsOpen(false);
		nav(route);
	};

	return (
		<>
			<IconButton onClick={() => setIsOpen((prev) => !prev)}>
				<MdOutlineMenu />
			</IconButton>

			<Modal className="p-2" onOpenChange={setIsOpen} open={isOpen}>
				<Section header="Сущности">
					<Cell
						onClick={onNav(getRouteSettings())}
						before={
							<IconContainer>
								<IoSettingsOutline />
							</IconContainer>
						}
					>
						Настройки ТГ Бота
					</Cell>
					<Cell
						onClick={onNav(getRouteRates())}
						before={
							<IconContainer>
								<FaMoneyBill />
							</IconContainer>
						}
					>
						Тарифы
					</Cell>
				</Section>
			</Modal>
		</>
	);
};
