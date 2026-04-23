"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { RightRail } from "@/components/RightRail";
import { TASK_CATEGORIES } from "@/lib/mock";

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

export default function ThingsPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>("travel");

  const selectPrompt = (prompt: string) => {
    router.push(`/task/new?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">Things I can do</div>
        </div>
        <div className="page-container" style={{ maxWidth: 720 }}>
          <h2 className="display-s" style={{ marginBottom: 8 }}>
            Things I can do for you.
          </h2>
          <p className="body-s ink-secondary" style={{ marginBottom: 40 }}>
            Just ask me in chat. Or tap one of these.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {TASK_CATEGORIES.map((c) => (
              <button
                key={c.id}
                className="card card-hover"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  gridColumn: expanded === c.id ? "1 / -1" : "auto",
                  transition: "all 240ms var(--ease-out)",
                }}
              >
                <div style={{ color: "var(--accent)", marginBottom: 12 }}>
                  <Icon name={iconFor(c.id)} size={24} />
                </div>
                <div className="heading" style={{ fontSize: 16 }}>
                  {c.name}
                </div>
                <div className="body-s ink-secondary" style={{ marginTop: 4 }}>
                  {c.description}
                </div>

                {expanded === c.id && (
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {c.prompts.map((p) => (
                      <button
                        key={p}
                        className="pill"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectPrompt(p);
                        }}
                        style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <RightRail />
    </>
  );
}
