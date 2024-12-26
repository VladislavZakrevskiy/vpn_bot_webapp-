import { Spinner } from "@telegram-apps/telegram-ui";

export const PageLoader = () => {
	return (
		<div className="w-screen h-screen p-3 flex justify-center items-center">
			<Spinner size="l" />
		</div>
	);
};
