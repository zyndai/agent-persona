"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/settings/accounts", label: "Accounts" },
  { href: "/settings/you", label: "You" },
  { href: "/settings/budget", label: "Budget" },
  { href: "/settings/agents", label: "Your agents" },
];

export function SettingsNav() {
  const pathname = usePathname();
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        borderBottom: "1px solid var(--border-subtle)",
        padding: "0 48px",
        position: "sticky",
        top: 56,
        background: "var(--paper)",
        zIndex: 9,
      }}
    >
      {ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "14px 16px",
              fontSize: 14,
              fontWeight: active ? 500 : 400,
              color: active ? "var(--ink)" : "var(--ink-muted)",
              borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
              textDecoration: "none",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
