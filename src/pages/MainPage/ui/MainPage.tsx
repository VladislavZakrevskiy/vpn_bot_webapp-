import { Title } from "@telegram-apps/telegram-ui";
import { memo } from "react";

const MainPage = memo(() => {
	return (
		<div className="flex justify-center items-center flex-1">
			<Title>Здравствуйте, это админка</Title>
		</div>
	);
});

export default MainPage;
