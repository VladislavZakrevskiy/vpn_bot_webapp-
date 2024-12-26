import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { StoreProvider } from "@/app/providers/StoreProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { AuthProvider } from "./entities/User/ui/AuthProvider";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
	<ThemeProvider>
		<BrowserRouter>
			<StoreProvider>
				<ErrorBoundary>
					<AuthProvider>
						<App />
					</AuthProvider>
				</ErrorBoundary>
			</StoreProvider>
		</BrowserRouter>
	</ThemeProvider>,
);
