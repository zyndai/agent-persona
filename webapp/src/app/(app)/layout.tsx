"use client";

import { Sidebar } from "@/components/Sidebar";
import { ToastProvider } from "@/components/Toast";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="app-shell">
        <Sidebar />
        {children}
      </div>
    </ToastProvider>
  );
}
