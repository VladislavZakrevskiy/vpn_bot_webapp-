import { lazy } from "react";

export const LazySupportPage = lazy(async () => await import("./SupportPage"));
