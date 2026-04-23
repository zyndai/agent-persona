"use client";

import { useState } from "react";
import { SettingsNav } from "@/components/SettingsNav";
import { RightRail } from "@/components/RightRail";
import { Icon } from "@/components/Icon";
import { SERVICE_AGENTS, DEFAULT_AGENTS, TASK_CATEGORIES } from "@/lib/mock";

const CATEGORY_ICONS: Record<string, "plane" | "bag" | "book-open" | "clipboard" | "briefcase"> = {
  Hotels: "briefcase",
  Flights: "plane",
  Shopping: "bag",
  Research: "book-open",
  Admin: "clipboard",
  Transport: "plane",
};

export default function AgentsPage() {
  const defaults = { ...DEFAULT_AGENTS };
  const [expanded, setExpanded] = useState<string | null>(null);
  const configured = Object.keys(defaults);
  const unconfigured = ["Research", "Admin", "Transport"].filter((c) => !configured.includes(c));

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">Settings</div>
        </div>
        <SettingsNav />
        <div className="page-container" style={{ maxWidth: 680 }}>
          <h2 className="display-s" style={{ marginBottom: 32 }}>
            Your agents
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span className="caption ink-muted">YOUR AGENTS</span>
            <span className="caption accent">{configured.length} ACTIVE</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {configured.map((cat) => {
              const agentId = defaults[cat];
              const agent = SERVICE_AGENTS.find((a) => a.id === agentId);
              if (!agent) return null;
              const open = expanded === cat;
              const candidates = SERVICE_AGENTS.filter((a) => a.category === cat);
              const iconKey = CATEGORY_ICONS[cat] ?? "briefcase";
              return (
                <div key={cat} className="card" style={{ padding: 16 }}>
                  <button
                    onClick={() => setExpanded(open ? null : cat)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        background: "var(--canvas-deep)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--ink-secondary)",
                      }}
                    >
                      <Icon name={iconKey} size={16} />
                    </div>
                    <div className="body" style={{ fontWeight: 500, flex: 1 }}>
                      {cat}
                    </div>
                    <span className="caption ink-muted">{candidates.length} available</span>
                    <Icon
                      name="chevron-down"
                      size={14}
                      style={{
                        transition: "transform 200ms",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        color: "var(--ink-muted)",
                      }}
                    />
                  </button>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    <AgentSquare color={agent.color} initial={agent.initial} />
                    <div>
                      <div className="body-s" style={{ fontWeight: 500 }}>
                        {agent.name} <span className="tag tag-mono" style={{ marginLeft: 6 }}>{agent.tag}</span>
                      </div>
                      <div className="caption ink-muted" style={{ marginTop: 2 }}>
                        default · {agent.completions} bookings
                      </div>
                    </div>
                  </div>

                  {open && (
                    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                      {candidates.map((c) => (
                        <button
                          key={c.id}
                          className="surface-row"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            textAlign: "left",
                            width: "100%",
                            background: c.id === agentId ? "var(--accent-soft)" : undefined,
                          }}
                        >
                          <AgentSquare color={c.color} initial={c.initial} />
                          <div style={{ flex: 1 }}>
                            <div className="body-s" style={{ fontWeight: 500 }}>
                              {c.name} <span className="tag tag-mono" style={{ marginLeft: 4, fontSize: 10 }}>{c.tag}</span>
                            </div>
                            <div className="caption ink-muted">
                              {c.completions} completions · {c.rating}★
                            </div>
                          </div>
                          {c.id === agentId && (
                            <span className="caption accent">default</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {unconfigured.length > 0 && (
            <>
              <div className="caption ink-muted" style={{ marginTop: 40, marginBottom: 12 }}>
                SET UP MORE
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {unconfigured.map((cat) => {
                  const iconKey = CATEGORY_ICONS[cat] ?? "briefcase";
                  return (
                    <div
                      key={cat}
                      style={{
                        border: "1px dashed var(--border-default)",
                        borderRadius: 10,
                        padding: "10px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Icon name={iconKey} size={14} style={{ color: "var(--ink-muted)" }} />
                      <div className="body-s" style={{ flex: 1 }}>
                        {cat}
                      </div>
                      <span className="caption accent">pick one →</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div style={{ marginTop: 48 }}>
            <div className="caption ink-muted">ALL TASK CATEGORIES I SUPPORT</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {TASK_CATEGORIES.map((c) => (
                <span key={c.id} className="tag tag-muted">
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RightRail />
    </>
  );
}

function AgentSquare({ color, initial }: { color: string; initial: string }) {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        background: color,
        color: "#fff",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {initial}
    </div>
  );
}
