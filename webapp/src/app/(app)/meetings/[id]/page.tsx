"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MEETINGS } from "@/lib/mock";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { Monogram } from "@/components/Monogram";
import { RightRail } from "@/components/RightRail";
import { useToast } from "@/components/Toast";

type TimeOption = { id: string; day: string; range: string };
const TIMES: TimeOption[] = [
  { id: "t1", day: "Tue, Apr 28", range: "3:00–3:30pm" },
  { id: "t2", day: "Thu, Apr 30", range: "10:00–10:30am" },
  { id: "t3", day: "Fri, May 1", range: "4:00–4:30pm" },
];

type ThreadMessage =
  | { id: string; kind: "aria"; body: string }
  | { id: string; kind: "user"; body: string }
  | { id: string; kind: "proposal" }
  | { id: string; kind: "meeting" };

export default function MeetingThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const meeting = MEETINGS.find((m) => m.id === id) || MEETINGS[0];
  const [tab, setTab] = useState<"messages" | "agents">("messages");
  const [messages, setMessages] = useState<ThreadMessage[]>([
    {
      id: "a1",
      kind: "aria",
      body: `${meeting.withName.split(" ")[0]}'s assistant said yes. You're now talking. Want me to suggest times?`,
    },
    { id: "m1", kind: "meeting" },
  ]);
  const [input, setInput] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [cancelConfirm, setCancelConfirm] = useState(false);

  const handleProposeTimes = () => {
    if (messages.some((m) => m.kind === "proposal")) return;
    setMessages((m) => [
      ...m,
      {
        id: "p1",
        kind: "aria",
        body: "Here are three times that work on both sides.",
      },
      { id: "prop1", kind: "proposal" },
    ]);
  };

  const handleConfirmTime = () => {
    toast.push("Meeting booked", "just now");
    setSelectedTime(null);
  };

  const handleCancelMeeting = () => {
    setCancelConfirm(false);
    toast.push("Meeting cancelled", "just now");
    router.push("/meetings");
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ padding: "24px 48px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
          <Link href="/meetings" className="btn-ghost" style={{ fontSize: 13, color: "var(--ink-muted)" }}>
            <Icon name="arrow-left" size={14} /> Meetings
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
            <Avatar initial={meeting.withInitial} size="lg" />
            <div style={{ flex: 1 }}>
              <div className="heading" style={{ fontSize: 18 }}>
                {meeting.withName}
              </div>
              <div className="body-s ink-secondary">{meeting.withRole}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <span className="tag tag-mono tag-muted">Introduced 2 days ago</span>
                <span className="tag tag-mono">Meeting confirmed for {meeting.dateLabel}</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleProposeTimes}>
              Propose a time
            </button>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            <TabButton active={tab === "messages"} onClick={() => setTab("messages")} label="Messages" />
            <TabButton active={tab === "agents"} onClick={() => setTab("agents")} label="Between our agents" />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <div className="chat-column">
            {tab === "messages" ? (
              messages.map((m) => {
                if (m.kind === "aria") {
                  return (
                    <div key={m.id} className="msg-row">
                      <div className="avatar">
                        <Monogram size={16} color="var(--accent)" />
                      </div>
                      <div className="msg-aria body">{m.body}</div>
                    </div>
                  );
                }
                if (m.kind === "user") {
                  return (
                    <div key={m.id} className="msg-row user">
                      <div className="msg-user body">{m.body}</div>
                    </div>
                  );
                }
                if (m.kind === "proposal") {
                  return (
                    <div key={m.id} style={{ paddingLeft: 40 }}>
                      <div className="card" style={{ background: "var(--surface)" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 12,
                          }}
                        >
                          <span
                            className="serif"
                            style={{ fontStyle: "italic", color: "var(--accent)", fontSize: 14 }}
                          >
                            Aria
                          </span>
                          <span className="caption ink-muted">just now</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {TIMES.map((t) => {
                            const active = selectedTime === t.id;
                            return (
                              <button
                                key={t.id}
                                className="surface-row"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  border: active ? "1px solid var(--border-strong)" : undefined,
                                  opacity: selectedTime && !active ? 0.55 : 1,
                                }}
                                onClick={() => setSelectedTime(t.id)}
                              >
                                <div style={{ textAlign: "left" }}>
                                  <div style={{ fontWeight: 500 }}>{t.day}</div>
                                  <div className="body-s ink-secondary">{t.range}</div>
                                </div>
                                <Icon
                                  name={active ? "check" : "chevron-right"}
                                  size={16}
                                  style={{ color: active ? "var(--accent)" : "var(--ink-muted)" }}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <div
                          style={{
                            marginTop: 16,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <button className="btn btn-tertiary">None of these work?</button>
                          {selectedTime && (
                            <button className="btn btn-primary btn-sm" onClick={handleConfirmTime}>
                              Confirm
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
                if (m.kind === "meeting") {
                  return (
                    <div key={m.id} style={{ paddingLeft: 40 }}>
                      <MeetingCard onCancel={() => setCancelConfirm(true)} />
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <AgentTranscript />
            )}
          </div>
        </div>

        <div className="chat-input-wrap">
          <div className="chat-input-inner">
            <div className="chat-input">
              <textarea
                rows={1}
                placeholder={`Message ${meeting.withName.split(" ")[0]}…`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && input.trim()) {
                    e.preventDefault();
                    setMessages((m) => [...m, { id: "u" + Date.now(), kind: "user", body: input }]);
                    setInput("");
                  }
                }}
              />
              <button
                className={`send-btn ${input.trim() ? "active" : ""}`}
                onClick={() => {
                  if (!input.trim()) return;
                  setMessages((m) => [...m, { id: "u" + Date.now(), kind: "user", body: input }]);
                  setInput("");
                }}
                aria-label="Send"
              >
                <Icon name="arrow-up" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <RightRail />

      {cancelConfirm && (
        <div className="overlay center" onClick={() => setCancelConfirm(false)}>
          <div className="modal center" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <h3 className="display-s" style={{ marginBottom: 12 }}>
                Cancel this meeting?
              </h3>
              <p className="body ink-secondary">
                I&apos;ll let {meeting.withName.split(" ")[0]}&apos;s assistant know. You can propose a new time anytime.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-tertiary" onClick={() => setCancelConfirm(false)}>
                Keep it
              </button>
              <button className="btn btn-danger" onClick={handleCancelMeeting}>
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: "8px 0",
        fontSize: 14,
        color: active ? "var(--ink)" : "var(--ink-muted)",
        fontWeight: active ? 500 : 400,
        borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function MeetingCard({ onCancel }: { onCancel: () => void }) {
  const meeting = MEETINGS[0];
  return (
    <div
      className="card"
      style={{
        background: "var(--accent-soft)",
        borderColor: "var(--border-default)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--accent)",
          marginBottom: 12,
        }}
      >
        <span className="serif" style={{ fontStyle: "italic", fontSize: 14 }}>
          Meeting
        </span>
        <Icon name="calendar" size={14} />
      </div>
      <div className="display-s" style={{ marginBottom: 4 }}>
        {meeting.dateLabel} · {meeting.timeLabel}
      </div>
      <div className="body-s ink-secondary">
        {meeting.durationLabel} with {meeting.withName}
      </div>
      <hr className="divider" style={{ margin: "20px 0" }} />
      <div className="label ink-muted" style={{ marginBottom: 8 }}>
        Prep
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {meeting.prep.map((line) => (
          <li key={line} className="body" style={{ display: "flex", gap: 8 }}>
            <span className="ink-muted">—</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        <button className="btn btn-tertiary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-secondary">Reschedule</button>
      </div>
    </div>
  );
}

function AgentTranscript() {
  return (
    <div style={{ paddingLeft: 40 }}>
      <div
        className="caption ink-muted"
        style={{ marginBottom: 12 }}
      >
        read-only · cleaned transcript between agents
      </div>
      <pre
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          lineHeight: "22px",
          color: "var(--ink-secondary)",
          whiteSpace: "pre-wrap",
          background: "var(--canvas-deep)",
          padding: 20,
          borderRadius: 8,
          border: "1px solid var(--border-subtle)",
        }}
      >
{`aria      → intro request for ravi from dillu. shared interests: agent infra, protocol handoffs.
ravi      → open to it, sending time windows from ravi's free blocks.
aria      → matched three: tue 3pm, thu 10am, fri 4pm. proposing to dillu.
ravi      → confirmed tue 3pm. calendar event created.`}
      </pre>
    </div>
  );
}
