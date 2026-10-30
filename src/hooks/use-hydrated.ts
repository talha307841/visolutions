"use client";
import { useSyncExternalStore } from "react";

// Render video elements after hydration so extensions cannot inject controls into
// server-rendered video markup before React has attached to it.
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
export function useHydrated() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}
