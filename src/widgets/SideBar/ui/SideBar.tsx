import { Cell, IconButton, IconContainer, Modal, Section } from "@telegram-apps/telegram-ui";
import { MdHelpOutline, MdOutlineMenu } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
	getRouteMailing,
	getRouteRates,
	getRouteSettings,
	getRouteSupport,
	getRouteUsers,
} from "@/shared/consts/router";
import { useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { FaRegCircleUser, FaRegMessage } from "react-icons/fa6";

export const SideBar = () => {
	const nav = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const onNav = (route: string) => () => {
		setIsOpen(false);
		nav(route);
	};

	return (
		<>
			<IconButton size="l" onClick={() => setIsOpen((prev) => !prev)}>
				<MdOutlineMenu />
			</IconButton>

			<Modal onOpenChange={setIsOpen} open={isOpen}>
				<Section header="Сущности">
					<Cell
						onClick={onNav(getRouteSupport())}
						before={
							<IconContainer>
								<MdHelpOutline />
							</IconContainer>
						}
					>
						Техподдержка
					</Cell>
					<Cell
						onClick={onNav(getRouteMailing())}
						before={
							<IconContainer>
								<FaRegMessage />
							</IconContainer>
						}
					>
						Рассылка
					</Cell>
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

					<Cell
						onClick={onNav(getRouteUsers())}
						before={
							<IconContainer>
								<FaRegCircleUser />
							</IconContainer>
						}
					>
						Пользователи
					</Cell>
				</Section>
			</Modal>
		</>
	);
};
