"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CASE_STUDIES } from "@/lib/case-studies";

interface CaseDetailCtx {
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
}

const Ctx = createContext<CaseDetailCtx | null>(null);

/**
 * Tiny shared-state bridge between the Case Studies showcase (which triggers
 * Read-more) and the Case Study detail window (which reads the selection).
 * Both live as sibling windows inside Desktop, so we lift the selection
 * up to a context that wraps them both.
 */
export function CaseDetailProvider({ children }: { children: ReactNode }) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    CASE_STUDIES[0].id,
  );
  const value = useMemo(
    () => ({ selectedCaseId, setSelectedCaseId }),
    [selectedCaseId],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCaseDetail() {
  const v = useContext(Ctx);
  if (!v) {
    throw new Error(
      "useCaseDetail must be used inside CaseDetailProvider",
    );
  }
  return v;
}
