import { lazy } from "react";

export const LazyMailingPage = lazy(async () => await import("./MailingPage"));
