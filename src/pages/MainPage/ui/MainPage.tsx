import { getRouteSettings, getRouteRates, getRouteUsers } from "@/shared/consts/router";
import { Cell, IconContainer, Title } from "@telegram-apps/telegram-ui";
import { memo } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MainPage = memo(() => {
	const nav = useNavigate();

	return (
		<div className="flex justify-center items-center flex-1">
			<Title>Здравствуйте, это админка</Title>
			<Title>Доступны эти секции: </Title>
			<Cell
				onClick={() => nav(getRouteSettings())}
				before={
					<IconContainer>
						<IoSettingsOutline />
					</IconContainer>
				}
			>
				Настройки ТГ Бота
			</Cell>
			<Cell
				onClick={() => nav(getRouteRates())}
				before={
					<IconContainer>
						<FaMoneyBill />
					</IconContainer>
				}
			>
				Тарифы
			</Cell>
			<Cell
				onClick={() => nav(getRouteUsers())}
				before={
					<IconContainer>
						<FaRegCircleUser />
					</IconContainer>
				}
			>
				Пользователи
			</Cell>
		</div>
	);
});

export default MainPage;
