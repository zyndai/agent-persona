"use client";

import { Icon } from "./Icon";
import { ACTIVITY } from "@/lib/mock";

function iconFor(kind: string) {
  switch (kind) {
    case "send":
      return <Icon name="send" size={14} />;
    case "calendar":
      return <Icon name="calendar" size={14} />;
    case "check":
      return <Icon name="check" size={14} />;
    case "eye":
      return <Icon name="eye" size={14} />;
    default:
      return <Icon name="sparkles" size={14} />;
  }
}

export function RightRail() {
  return (
    <aside className="right-rail">
      <div className="label" style={{ color: "var(--ink-muted)", marginBottom: 16 }}>
        What Aria&apos;s doing
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {ACTIVITY.map((a) => (
          <div key={a.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: "var(--accent)", marginTop: 2 }}>{iconFor(a.icon)}</span>
            <div>
              <div className="body-s" style={{ color: "var(--ink)" }}>
                {a.text}
              </div>
              <div className="caption" style={{ color: "var(--ink-muted)", marginTop: 2 }}>
                {a.timeLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="divider" style={{ margin: "28px 0" }} />

      <div className="caption" style={{ color: "var(--ink-muted)", lineHeight: 1.6 }}>
        She reads · she introduces · she schedules.
        <br />
        Nothing leaves without your OK.
      </div>
    </aside>
  );
}
