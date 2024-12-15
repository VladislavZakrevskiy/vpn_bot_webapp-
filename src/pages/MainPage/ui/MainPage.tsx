import { Title } from "@telegram-apps/telegram-ui";
import { memo } from "react";

const MainPage = memo(() => {
	return (
		<div>
			<Title>Здравствуйте, это админка</Title>
		</div>
	);
});

export default MainPage;
