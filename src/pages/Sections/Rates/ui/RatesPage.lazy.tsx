import { lazy } from "react";

export const LazyRatePage = lazy(async () => await import("./RatesPage"));
