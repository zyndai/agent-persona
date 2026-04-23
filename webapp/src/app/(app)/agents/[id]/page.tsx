"use client";

import { use } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RightRail } from "@/components/RightRail";
import { SERVICE_AGENTS, DEFAULT_AGENTS } from "@/lib/mock";
import { useToast } from "@/components/Toast";

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const toast = useToast();
  const agent = SERVICE_AGENTS.find((a) => a.id === id) ?? SERVICE_AGENTS[0];
  const isDefault = DEFAULT_AGENTS[agent.category] === agent.id;

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">
            <Link href="/settings/agents" className="btn-ghost" style={{ color: "var(--ink-muted)", fontSize: 13 }}>
              <Icon name="arrow-left" size={14} /> Your agents
            </Link>
          </div>
        </div>
        <div className="page-container" style={{ maxWidth: 560 }}>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 10,
                background: agent.color,
                color: "#fff",
                fontWeight: 600,
                fontSize: 24,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {agent.initial}
            </div>
            <h2 className="display-s" style={{ marginTop: 16 }}>
              {agent.name}
            </h2>
            <div style={{ marginTop: 6 }}>
              <span className="tag tag-mono">{agent.tag}</span>
            </div>
            <div className="body-s ink-muted" style={{ marginTop: 8 }}>
              {agent.operator}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 64,
              padding: "32px 0",
              borderTop: "1px solid var(--border-subtle)",
              borderBottom: "1px solid var(--border-subtle)",
              marginTop: 32,
            }}
          >
            <Stat big={String(agent.completions)} label={`${agent.category.toUpperCase()} BOOKINGS`} />
            <Stat big={`${agent.rating}★`} label="AVERAGE" />
            <Stat big={agent.median} label="MEDIAN" />
          </div>

          <p className="body" style={{ marginTop: 24, lineHeight: 1.6 }}>
            {agent.description}
          </p>

          {agent.reviews.length > 0 && (
            <div style={{ marginTop: 24 }}>
              {agent.reviews.map((r) => (
                <div key={r.by} style={{ marginBottom: 20 }}>
                  <div
                    className="serif"
                    style={{
                      fontStyle: "italic",
                      fontSize: 15,
                      lineHeight: "22px",
                      color: "var(--ink-secondary)",
                    }}
                  >
                    &ldquo;{r.quote}&rdquo;
                  </div>
                  <div className="caption ink-muted" style={{ marginTop: 4 }}>
                    — {r.by}, {r.when}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "flex-end",
              marginTop: 40,
              paddingTop: 16,
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            {isDefault ? (
              <>
                <button
                  className="btn btn-danger"
                  onClick={() => toast.push("Stopped using " + agent.name)}
                >
                  Stop using this agent
                </button>
                <button className="btn btn-secondary" disabled>
                  Currently default
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() =>
                  toast.push(`${agent.name} · default for ${agent.category.toLowerCase()}`)
                }
              >
                Use for my next booking
              </button>
            )}
          </div>
        </div>
      </div>
      <RightRail />
    </>
  );
}

function Stat({ big, label }: { big: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="mono" style={{ fontSize: 18, color: "var(--ink)" }}>
        {big}
      </div>
      <div className="caption ink-muted" style={{ marginTop: 4, letterSpacing: "1.2px" }}>
        {label}
      </div>
    </div>
  );
}
