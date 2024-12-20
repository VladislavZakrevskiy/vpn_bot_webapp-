import { lazy } from "react";

export const LazyTicketPage = lazy(async () => await import("./TicketPage"));
