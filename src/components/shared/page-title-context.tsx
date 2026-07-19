"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type PageTitleContextValue = {
  title: string | null;
  setTitle: (t: string | null) => void;
};

const PageTitleContext = createContext<PageTitleContextValue | undefined>(
  undefined,
);

export function PageTitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState<string | null>(null);
  const value = useMemo(() => ({ title, setTitle }), [title]);
  return (
    <PageTitleContext.Provider value={value}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  const ctx = useContext(PageTitleContext);
  if (!ctx)
    throw new Error("usePageTitle must be used within a PageTitleProvider");
  return ctx;
}

// Component to set the page title in context from a page component (client)
export function SetPageTitle({ title }: { title: string }) {
  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle(title ?? null);
    return () => setTitle(null);
  }, [title, setTitle]);
  return null;
}

export default PageTitleProvider;
