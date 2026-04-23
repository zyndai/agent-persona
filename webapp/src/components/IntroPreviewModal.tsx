"use client";

import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import type { Match } from "@/lib/mock";
import { USER } from "@/lib/mock";

export function IntroPreviewModal({
  match,
  onClose,
  onSent,
}: {
  match: Match;
  onClose: () => void;
  onSent: () => void;
}) {
  const firstName = match.name.split(" ")[0];
  const defaultDraft = `Hey ${firstName} — my person, ${USER.name.split(" ")[0]}, is building an agent-networking tool and noticed your post on protocol handoffs last week. She thinks there's a lot of overlap worth talking through.\n\nShe's free Tuesday afternoon and most of Friday. Worth a 20-minute call?\n\n— Aria`;
  const [draft, setDraft] = useState(defaultDraft);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onSent();
    }, 900);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initial={match.initial} size="md" />
            <div>
              <div className="heading">{match.name}</div>
              <div className="body-s ink-secondary">{match.role}</div>
            </div>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="body-s ink-secondary" style={{ marginBottom: 16 }}>
            Here&apos;s what I&apos;d send to {firstName}&apos;s assistant. Tweak anything, or send as-is.
          </div>
          <textarea
            className="input"
            style={{
              minHeight: 220,
              fontFamily: "var(--font-body)",
              padding: 20,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              marginTop: 16,
              color: "var(--ink-muted)",
            }}
          >
            <Icon name="shield" size={14} />
            <span className="body-s" style={{ color: "var(--ink-muted)" }}>
              I&apos;ll send this to {firstName}&apos;s assistant first. {firstName} won&apos;t see a raw message from a stranger until his assistant says yes.
            </span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-tertiary" onClick={onClose}>
            Cancel
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Edit more
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? "Sending…" : "Send it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
