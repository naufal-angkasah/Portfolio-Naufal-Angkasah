"use client";

import React, { createContext, useContext, useCallback, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────
type ReadyContextValue = {
  /** Call this once from each tracked component when it has finished rendering */
  reportReady: (id: string) => void;
  /** Subscribe to be notified when ALL tracked ids are ready */
  onAllReady: (ids: string[], cb: () => void) => () => void;
};

const ReadyContext = createContext<ReadyContextValue>({
  reportReady: () => {},
  onAllReady: () => () => {},
});

// ── Provider ──────────────────────────────────────────────────────────────
export function ReadyProvider({ children }: { children: React.ReactNode }) {
  // Set of component IDs that have reported ready
  const readySet = useRef<Set<string>>(new Set());
  // Pending subscriptions: { ids[], callback }[]
  const subscriptions = useRef<{ ids: string[]; cb: () => void }[]>([]);

  const reportReady = useCallback((id: string) => {
    readySet.current.add(id);
    // Check if any pending subscription is now satisfied
    subscriptions.current = subscriptions.current.filter(({ ids, cb }) => {
      const allDone = ids.every((i) => readySet.current.has(i));
      if (allDone) {
        cb();
        return false; // remove from list
      }
      return true;
    });
  }, []);

  const onAllReady = useCallback((ids: string[], cb: () => void) => {
    // Already ready?
    if (ids.every((i) => readySet.current.has(i))) {
      cb();
      return () => {};
    }
    const entry = { ids, cb };
    subscriptions.current.push(entry);
    // Return unsubscribe
    return () => {
      subscriptions.current = subscriptions.current.filter((s) => s !== entry);
    };
  }, []);

  return (
    <ReadyContext.Provider value={{ reportReady, onAllReady }}>
      {children}
    </ReadyContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────
export function useReady() {
  return useContext(ReadyContext);
}
