import { Suspense } from "react";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import "./index.css";
import { SideBar } from "@/widgets/SideBar";

const App = () => {
	return (
		<div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--tgui--bg_color)" }}>
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
