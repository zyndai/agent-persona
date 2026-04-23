"use client";

import { useState } from "react";
import { RightRail } from "@/components/RightRail";
import { Icon } from "@/components/Icon";

export default function BriefPage() {
  const [workingOn, setWorkingOn] = useState(
    "Shipping the first version of my agent-networking tool. Mostly heads-down on the protocol layer this month.",
  );
  const [meeting, setMeeting] = useState(
    "Founders in the agent space. Early-stage investors who think hard about infra. Thoughtful product designers.",
  );
  const [avoiding, setAvoiding] = useState("Recruiters. Fundraising intros until October.");
  const [notes, setNotes] = useState("Based in Bangalore, open to traveling for the right intro.");

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">Your brief</div>
          <a
            href="#"
            className="btn btn-tertiary"
            onClick={(e) => e.preventDefault()}
          >
            <Icon name="file-text" size={14} />
            Open in Drive
          </a>
        </div>
        <div className="page-container">
          <p className="body ink-secondary" style={{ marginBottom: 24 }}>
            I re-read this whenever it changes. The more specific, the better I match.
          </p>
          <div className="card" style={{ padding: 32 }}>
            <div
              className="display-s"
              style={{ fontStyle: "italic", marginBottom: 24, fontSize: 20 }}
            >
              My brief — for Aria
            </div>
            <DocField label="What I'm working on" value={workingOn} onChange={setWorkingOn} />
            <DocField label="Who I'd like to meet" value={meeting} onChange={setMeeting} />
            <DocField label="What I'm avoiding right now" value={avoiding} onChange={setAvoiding} />
            <DocField label="Anything else Aria should know" value={notes} onChange={setNotes} />
          </div>
          <p className="caption ink-muted" style={{ marginTop: 20, textAlign: "center" }}>
            Changes save as you type · synced with your Drive
          </p>
        </div>
      </div>
      <RightRail />
    </>
  );
}

function DocField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        className="label"
        style={{
          textDecoration: "underline",
          textUnderlineOffset: 4,
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "vertical",
          fontFamily: "var(--font-body)",
          fontSize: 14.5,
          lineHeight: 1.55,
          color: "var(--ink-secondary)",
          minHeight: 48,
        }}
      />
    </div>
  );
}
