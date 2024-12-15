import { Suspense } from "react";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import { SideBar } from "@/widgets/SideBar";
import "./index.css";
import "@telegram-apps/telegram-ui/dist/styles.css";

const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Suspense fallback={<PageLoader />}>
				<div className="flex justify-between p-3">
					<SideBar />
				</div>
				<AppRouter />
			</Suspense>
		</div>
	);
};

export default App;
