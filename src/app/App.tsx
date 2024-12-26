import { Suspense } from "react";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import { SideBar } from "@/widgets/SideBar";
import "./index.css";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { useLocation } from "react-router-dom";
import { getRouteSupport } from "@/shared/consts/router";
import { TagModal } from "@/pages/Sections/Support/ui/Tags/TagModal";

const App = () => {
	const { pathname } = useLocation();
	return (
		<div className="flex flex-col min-h-screen">
			<Suspense fallback={<PageLoader />}>
				<div className="flex justify-between p-3">
					<SideBar />
					{pathname === getRouteSupport() && <TagModal />}
				</div>
				<AppRouter />
			</Suspense>
		</div>
	);
};

export default App;
