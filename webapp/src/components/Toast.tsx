"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Toast = { id: number; text: string; caption?: string };
const ToastCtx = createContext<{
  push: (text: string, caption?: string) => void;
}>({ push: () => {} });

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((text: string, caption?: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text, caption }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span>{t.text}</span>
            {t.caption && (
              <span className="caption" style={{ color: "var(--ink-muted)", marginLeft: 8 }}>
                · {t.caption}
              </span>
            )}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function DisappearingMessage({
  text,
  after = 2000,
}: {
  text: string;
  after?: number;
}) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setVisible(false), after);
    return () => clearTimeout(id);
  }, [after]);
  if (!visible) return null;
  return <div className="fade-in">{text}</div>;
}
