import { getRouteMain } from "@/shared/consts/router";
import { useAppSelector } from "@/shared/lib/hooks";
import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
	children?: ReactNode;
}

export const RequireAuth: FC<Props> = ({ children }) => {
	const auth = useAppSelector((state) => state.user);
	const location = useLocation();

	if (!auth) {
		return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
	}

	return children;
};
