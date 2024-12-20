import { useHealthQuery } from "@/entities/User/model/api/user.api";
import {
	getRouteSettings,
	getRouteRates,
	getRouteUsers,
	getRouteMailing,
	getRouteSupport,
} from "@/shared/consts/router";
import { Button, Caption, IconContainer, Text, Title } from "@telegram-apps/telegram-ui";
import { memo } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { FaRegCircleUser, FaRegMessage } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdHelpOutline, MdOutlineGppBad, MdOutlineGppGood } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MainPage = memo(() => {
	const { data, isLoading } = useHealthQuery();
	const nav = useNavigate();

	return (
		<div className="flex justify-center flex-col gap-2 items-center flex-1">
			{!isLoading && (
				<div className="flex gap-1 flex-col justify-center items-center">
					<Text>VPN API статус:</Text>
					<div className="flex justify-center items-center gap-1 ">
						{(
							Object.entries(
								{ delete: data?.delete, get: data?.get, patch: data?.patch, post: data?.post, put: data?.put }!,
							) as [key: string, { msg: string }][]
						).map(([key, status]) => (
							<div className="flex flex-col items-center gap-1">
								<IconContainer>
									{status?.msg.includes("PONG") ? <MdOutlineGppGood size={30} /> : <MdOutlineGppBad size={30} />}
								</IconContainer>
								<Caption>{key.toUpperCase()}</Caption>
							</div>
						))}
					</div>
				</div>
			)}
			<Title>Здравствуйте, это админка</Title>
			<Title>Доступны эти секции: </Title>
			<Button
				mode="bezeled"
				onClick={() => nav(getRouteSupport())}
				before={
					<IconContainer>
						<MdHelpOutline />
					</IconContainer>
				}
			>
				Техподдержка
			</Button>
			<Button
				mode="bezeled"
				onClick={() => nav(getRouteMailing())}
				before={
					<IconContainer>
						<FaRegMessage />
					</IconContainer>
				}
			>
				Рассылка
			</Button>
			<Button
				mode="bezeled"
				onClick={() => nav(getRouteSettings())}
				before={
					<IconContainer>
						<IoSettingsOutline />
					</IconContainer>
				}
			>
				Настройки ТГ Бота
			</Button>
			<Button
				mode="bezeled"
				onClick={() => nav(getRouteRates())}
				before={
					<IconContainer>
						<FaMoneyBill />
					</IconContainer>
				}
			>
				Тарифы
			</Button>
			<Button
				mode="bezeled"
				onClick={() => nav(getRouteUsers())}
				before={
					<IconContainer>
						<FaRegCircleUser />
					</IconContainer>
				}
			>
				Пользователи
			</Button>
		</div>
	);
});

export default MainPage;
