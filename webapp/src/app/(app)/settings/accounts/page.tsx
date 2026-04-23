"use client";

import { useState } from "react";
import Link from "next/link";
import { SettingsNav } from "@/components/SettingsNav";
import { Icon } from "@/components/Icon";
import { CONNECTORS } from "@/lib/mock";
import { RightRail } from "@/components/RightRail";
import { useToast } from "@/components/Toast";

function connectorIcon(id: string) {
  switch (id) {
    case "linkedin":
      return "linkedin" as const;
    case "brief":
      return "file-text" as const;
    case "calendar":
      return "calendar" as const;
    case "telegram":
      return "send" as const;
    default:
      return "user" as const;
  }
}

export default function AccountsPage() {
  const toast = useToast();
  const [connectors, setConnectors] = useState(CONNECTORS);

  const toggle = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, connected: !c.connected } : c)),
    );
    const target = connectors.find((c) => c.id === id);
    if (target) {
      toast.push(target.connected ? `Disconnected ${target.name}` : `${target.name} connected`);
    }
  };

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">Settings</div>
        </div>
        <SettingsNav />
        <div className="page-container" style={{ maxWidth: 880 }}>
          <h2 className="display-s" style={{ marginBottom: 8 }}>
            Accounts
          </h2>
          <p className="body ink-secondary" style={{ marginBottom: 32 }}>
            Four things Aria can see. Nothing else.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {connectors.map((c) => (
              <div key={c.id} className="card" style={{ minHeight: 220, display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      color: c.connected ? "var(--accent)" : "var(--ink-muted)",
                    }}
                  >
                    <Icon name={connectorIcon(c.id)} size={24} />
                  </div>
                  <span
                    className="tag tag-mono"
                    style={{
                      background: c.connected ? "var(--accent-soft)" : "var(--surface-raised)",
                      color: c.connected ? "var(--accent)" : "var(--ink-muted)",
                    }}
                  >
                    {c.connected ? "Connected" : "Not connected"}
                  </span>
                </div>
                <div className="heading" style={{ marginTop: 12 }}>
                  {c.name}
                </div>
                <p className="body-s ink-secondary" style={{ marginTop: 8, flex: 1 }}>
                  {c.description}
                </p>
                {c.connected && c.meta && (
                  <div className="caption ink-muted" style={{ marginTop: 12 }}>
                    {c.meta}
                  </div>
                )}
                <div style={{ marginTop: 16 }}>
                  {c.connected ? (
                    <button className="btn btn-tertiary" onClick={() => toggle(c.id)}>
                      Disconnect
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-sm" onClick={() => toggle(c.id)}>
                      {c.actionLabel}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <Link href="/agents" className="card card-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none" }}>
              <div>
                <div className="heading">Your agents</div>
                <div className="body-s ink-secondary" style={{ marginTop: 4 }}>
                  Which agents Aria delegates to for tasks like hotels, shopping, research.
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink-muted)" }}>
                <span className="caption">3 active</span>
                <Icon name="chevron-right" size={16} />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <RightRail />
    </>
  );
}
