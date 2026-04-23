"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { Monogram } from "./Monogram";
import { USER } from "@/lib/mock";

const ARIA_NAV = [
  { href: "/home", label: "Home", icon: "home" as const },
  { href: "/meetings", label: "Meetings", icon: "calendar" as const },
  { href: "/people", label: "People", icon: "users" as const },
];

const YOU_NAV = [
  { href: "/brief", label: "Your brief", icon: "file-text" as const },
  { href: "/settings/accounts", label: "Settings", icon: "settings" as const },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Monogram size={22} color="var(--accent)" />
        <span className="sidebar-brand-text">Zynd</span>
      </div>

      <div className="sidebar-label">Aria</div>
      {ARIA_NAV.map((item) => {
        const active = pathname === item.href || pathname?.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${active ? "active" : ""}`}
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <div className="sidebar-label">You</div>
      {YOU_NAV.map((item) => {
        const active = pathname === item.href || pathname?.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${active ? "active" : ""}`}
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <Link
        href="/things"
        className={`nav-item accent-icon ${
          pathname === "/things" ? "active" : ""
        }`}
        style={{ marginTop: 6 }}
      >
        <Icon name="sparkles" size={16} />
        <span>Things I can do</span>
      </Link>

      <div className="sidebar-user">
        <div className="avatar" style={{ width: 32, height: 32, fontSize: 14 }}>
          {USER.initial}
        </div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{USER.name}</div>
          <div className="sidebar-user-sub">online</div>
        </div>
        <button
          className="btn-ghost"
          style={{ padding: 4, color: "var(--ink-muted)" }}
          aria-label="Sign out"
        >
          <Icon name="log-out" size={14} />
        </button>
      </div>
    </aside>
  );
}
