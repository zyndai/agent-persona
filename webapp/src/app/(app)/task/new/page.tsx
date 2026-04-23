"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { RightRail } from "@/components/RightRail";
import { SERVICE_AGENTS, DEFAULT_AGENTS } from "@/lib/mock";

const STREAM_LINES = [
  "asked 3 hotel agents",
  "Marriott replied: Park Hyatt, ₹19,200",
  "asked for a better rate",
  "counter: ₹17,400 if 4+ nights",
  "checking your brief for preferences",
  "confirming details",
];

function LiveTaskInner() {
  const router = useRouter();
  const search = useSearchParams();
  const prompt = search.get("prompt") ?? "Book me a hotel in Tokyo next month";
  const category = prompt.toLowerCase().includes("hotel")
    ? "Hotels"
    : prompt.toLowerCase().includes("flight")
      ? "Flights"
      : prompt.toLowerCase().includes("grocer") || prompt.toLowerCase().includes("bigbasket")
        ? "Shopping"
        : "Admin";

  const agentId = DEFAULT_AGENTS[category];
  const [agentSelectOpen, setAgentSelectOpen] = useState(!agentId);
  const [selectedAgent, setSelectedAgent] = useState<string>(agentId ?? SERVICE_AGENTS[0].id);
  const agent = SERVICE_AGENTS.find((a) => a.id === selectedAgent) ?? SERVICE_AGENTS[0];
  const [visible, setVisible] = useState(0);
  const [quote, setQuote] = useState<number | null>(null);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  useEffect(() => {
    if (agentSelectOpen) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    STREAM_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), 600 + i * 800));
    });
    timers.push(setTimeout(() => setQuote(19200), 1600));
    timers.push(setTimeout(() => setQuote(17400), 3600));
    timers.push(
      setTimeout(() => router.push(`/task/booking-4102?agent=${agent.id}`), 600 + STREAM_LINES.length * 800 + 600),
    );
    return () => timers.forEach(clearTimeout);
  }, [agentSelectOpen, router, agent.id]);

  if (agentSelectOpen) {
    const candidates = SERVICE_AGENTS.filter((a) => a.category === category).slice(0, 3);
    const pick = candidates[0];
    return (
      <div className="overlay" onClick={() => router.back()}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Icon name="sparkles" size={18} style={{ color: "var(--accent)" }} />
              <span className="heading">First time for this one</span>
            </div>
            <button className="btn-ghost" onClick={() => router.back()} aria-label="Close">
              <Icon name="x" size={18} />
            </button>
          </div>
          <div className="modal-body">
            <div className="body" style={{ marginBottom: 12 }}>
              First time booking {category.toLowerCase()}. These {candidates.length} can do it — want me to use the first one?
            </div>
            <div
              className="caption ink-muted"
              style={{ letterSpacing: "1.5px", marginBottom: 16 }}
            >
              {prompt.toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {candidates.map((a) => {
                const active = selectedAgent === a.id;
                const recommended = a.id === pick.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAgent(a.id)}
                    className="surface-row"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      textAlign: "left",
                      width: "100%",
                      borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                      background: active ? "var(--accent-soft)" : "var(--surface-raised)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          background: a.color,
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {a.initial}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="body" style={{ fontWeight: 500 }}>
                          {a.name}{" "}
                          <span className="tag tag-mono" style={{ marginLeft: 4, fontSize: 10 }}>
                            {a.tag}
                          </span>
                        </div>
                        <div className="caption ink-muted">
                          {a.category.toLowerCase()} · {a.operator}
                        </div>
                      </div>
                      {recommended && (
                        <span
                          className="caption accent"
                          style={{ letterSpacing: "1.5px" }}
                        >
                          ARIA&apos;S PICK
                        </span>
                      )}
                    </div>
                    <div className="caption ink-secondary">
                      {a.completions.toLocaleString()} completions · {a.rating}★
                    </div>
                    {recommended && (
                      <div
                        className="body-s"
                        style={{ color: "var(--ink-secondary)", fontStyle: "italic" }}
                      >
                        Best fit for your dates under your cap. Quick turnaround.
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-tertiary" onClick={() => router.back()}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setAgentSelectOpen(false)}
            >
              Use this one
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">
            <span className="caption accent" style={{ letterSpacing: "1.5px" }}>
              BOOKING HOTEL
            </span>
          </div>
        </div>
        <div className="page-container" style={{ maxWidth: 720 }}>
          <div
            className="card"
            style={{
              borderLeft: "2px solid var(--accent)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "20px 24px",
            }}
          >
            <div>
              <div className="caption accent" style={{ letterSpacing: "1.5px" }}>
                BOOKING HOTEL
              </div>
              <div className="body" style={{ marginTop: 6 }}>
                {prompt}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 12,
                  padding: "3px 10px",
                  background: "var(--surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: 999,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: agent.color,
                    color: "#fff",
                    fontSize: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {agent.initial}
                </div>
                <span className="caption" style={{ fontWeight: 500, color: "var(--ink)" }}>
                  {agent.name}
                </span>
                <span className="caption ink-muted">{agent.tag}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                className="mono"
                style={{
                  fontSize: 20,
                  color: "var(--accent)",
                  fontWeight: 500,
                  animation: quote ? "fadeIn 220ms var(--ease-out)" : undefined,
                }}
              >
                {quote ? `₹${quote.toLocaleString()}` : "—"}
              </div>
              <div className="caption ink-muted" style={{ marginTop: 4 }}>
                of ₹18,000 cap
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {STREAM_LINES.map((line, i) => {
              const isDone = visible > i;
              const isActive = visible === i + 1 && i === STREAM_LINES.length - 1;
              return (
                <div
                  key={line}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: visible > i ? 1 : 0.25,
                    transition: "opacity 260ms var(--ease-out)",
                  }}
                >
                  <span style={{ color: isDone ? "var(--accent)" : "var(--ink-muted)", width: 14, display: "inline-flex" }}>
                    {isDone ? <Icon name="check" size={14} /> : null}
                  </span>
                  <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>
                    {line}
                    {isActive && <span style={{ color: "var(--accent)", animation: "blinkCursor 1s infinite" }}>_</span>}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              className="btn-ghost caption ink-muted"
              onClick={() => setTranscriptOpen((v) => !v)}
              style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
            >
              <Icon name="chevron-down" size={12} style={{ transform: transcriptOpen ? "rotate(180deg)" : undefined, transition: "transform 180ms" }} />
              see what Aria and the {agent.name.split(" ")[0]} agent are saying
            </button>
            {transcriptOpen && (
              <pre
                style={{
                  background: "var(--canvas-deep)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 6,
                  padding: 16,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--ink-secondary)",
                  marginTop: 12,
                  lineHeight: "20px",
                  whiteSpace: "pre-wrap",
                }}
              >
{`aria       →   any 4-night deal for Tokyo, Nov 10–14, under ₹18k?
marriott   →   Park Hyatt Tokyo available, ₹19,200/night
aria       →   above cap. anything at Andaz or lower?
marriott   →   Park Hyatt drops to ₹17,400 at 4+ nights`}
              </pre>
            )}
          </div>

          <div style={{ marginTop: 40, textAlign: "right" }}>
            <button className="btn btn-ghost" onClick={() => router.push("/home")}>
              <Icon name="pause" size={14} /> change my mind
            </button>
          </div>
        </div>
      </div>
      <RightRail />
    </>
  );
}

export default function LiveTaskPage() {
  return (
    <Suspense fallback={<div className="paper-canvas" />}>
      <LiveTaskInner />
    </Suspense>
  );
}
