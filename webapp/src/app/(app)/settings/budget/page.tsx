"use client";

import { useState } from "react";
import { SettingsNav } from "@/components/SettingsNav";
import { RightRail } from "@/components/RightRail";
import { Icon } from "@/components/Icon";
import { BUDGETS } from "@/lib/mock";
import { useToast } from "@/components/Toast";

type Period = "month" | "week";
type Row = { id: string; label: string; amount: number; period: Period; spent: number };

function iconFor(id: string) {
  switch (id) {
    case "travel":
      return "plane" as const;
    case "shopping":
      return "bag" as const;
    case "research":
      return "book-open" as const;
    default:
      return "clipboard" as const;
  }
}

export default function BudgetPage() {
  const toast = useToast();
  const [rows, setRows] = useState<Row[]>(BUDGETS);
  const [paused, setPaused] = useState(false);

  const updateAmount = (id: string, v: number) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, amount: v } : r)));
  };
  const togglePeriod = (id: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, period: r.period === "month" ? "week" : "month" } : r)),
    );
  };

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">Settings</div>
        </div>
        <SettingsNav />
        <div className="page-container" style={{ maxWidth: 560 }}>
          <h2 className="display-s" style={{ marginBottom: 8 }}>
            Some things I do cost money. Set the limits.
          </h2>
          <p className="body-s ink-secondary" style={{ marginBottom: 32 }}>
            I&apos;ll never spend over these. If I run out, I&apos;ll ask.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rows.map((r) => (
              <div
                key={r.id}
                className="card"
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                  opacity: paused ? 0.55 : 1,
                  padding: 20,
                }}
              >
                <Icon name={iconFor(r.id)} size={22} style={{ color: "var(--ink-secondary)" }} />
                <div style={{ flex: 1 }}>
                  <div className="heading" style={{ fontSize: 15 }}>
                    {r.label}
                  </div>
                  {r.amount > 0 ? (
                    <div className="body-s ink-muted" style={{ marginTop: 4 }}>
                      Spent ₹{r.spent.toLocaleString()} of ₹{r.amount.toLocaleString()} this {r.period}
                    </div>
                  ) : (
                    <div className="body-s ink-muted" style={{ marginTop: 4 }}>
                      Not set
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="mono" style={{ color: "var(--accent)", fontSize: 20 }}>
                    ₹
                  </span>
                  <input
                    type="number"
                    value={r.amount || ""}
                    placeholder="0"
                    onChange={(e) => updateAmount(r.id, Number(e.target.value) || 0)}
                    disabled={paused}
                    style={{
                      width: 96,
                      background: "transparent",
                      border: "1px dashed var(--border-subtle)",
                      outline: "none",
                      fontFamily: "var(--font-mono)",
                      fontSize: 20,
                      color: "var(--accent)",
                      padding: "4px 8px",
                      textAlign: "right",
                      borderRadius: 4,
                      textDecoration: paused ? "line-through" : "none",
                    }}
                  />
                  <button
                    onClick={() => togglePeriod(r.id)}
                    disabled={paused}
                    className="caption"
                    style={{
                      background: "transparent",
                      border: "1px solid var(--border-subtle)",
                      padding: "4px 10px",
                      borderRadius: 4,
                      color: "var(--ink-secondary)",
                    }}
                  >
                    / {r.period}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <hr className="divider" style={{ margin: "32px 0" }} />

          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={paused}
              onChange={(e) => setPaused(e.target.checked)}
              style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--accent)" }}
            />
            <div>
              <div className="body" style={{ fontWeight: 500 }}>
                Pause Aria&apos;s spending
              </div>
              <div className="body-s ink-muted" style={{ marginTop: 2 }}>
                She&apos;ll still read, introduce, and schedule. Nothing that costs.
              </div>
            </div>
          </label>

          <div style={{ marginTop: 48, color: "var(--ink-muted)", fontSize: 13, lineHeight: 1.8 }}>
            <div>I&apos;ll never spend more without checking with you first.</div>
            <div>Unspent caps don&apos;t roll over. If I don&apos;t need it, I don&apos;t use it.</div>
            <div>You can change any of this anytime.</div>
          </div>

          <div style={{ textAlign: "right", marginTop: 32 }}>
            <button className="btn btn-primary" onClick={() => toast.push("Budget saved", "just now")}>
              Save
            </button>
          </div>
        </div>
      </div>
      <RightRail />
    </>
  );
}
