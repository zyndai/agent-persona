"use client";

import { useEffect, useRef, useState } from "react";
import { RightRail } from "@/components/RightRail";
import { MatchCard } from "@/components/MatchCard";
import { IntroPreviewModal } from "@/components/IntroPreviewModal";
import { Icon } from "@/components/Icon";
import { Monogram } from "@/components/Monogram";
import { EXTRA_MATCHES, type Match } from "@/lib/mock";
import { useToast } from "@/components/Toast";

type Msg =
  | { id: string; kind: "aria"; body: string }
  | { id: string; kind: "user"; body: string }
  | { id: string; kind: "system"; body: string; time: string }
  | { id: string; kind: "match"; match: Match }
  | { id: string; kind: "thinking" };

const SUGGESTIONS = ["Show me matches", "Propose a time", "Open my brief"];

export default function HomePage() {
  const toast = useToast();
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      kind: "aria",
      body: "Morning. Found one for you — want to see?",
    },
  ]);
  const [input, setInput] = useState("");
  const [introMatch, setIntroMatch] = useState<Match | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userId = "u" + Date.now();
    const thinkId = "t" + Date.now();
    setMessages((m) => [...m, { id: userId, kind: "user", body: text }, { id: thinkId, kind: "thinking" }]);
    setInput("");

    setTimeout(() => {
      setMessages((m) => m.filter((msg) => msg.id !== thinkId));
      // React based on user input
      const lower = text.toLowerCase();
      if (lower.includes("match") || lower === "yes" || lower.includes("show")) {
        setMessages((m) => [
          ...m,
          {
            id: "r" + Date.now(),
            kind: "aria",
            body: "Found someone who just posted something relevant. Ravi Shah at Lattice Labs.",
          },
          { id: "mc" + Date.now(), kind: "match", match: EXTRA_MATCHES[0] },
        ]);
      } else if (lower.includes("brief")) {
        setMessages((m) => [
          ...m,
          {
            id: "r" + Date.now(),
            kind: "aria",
            body: "Your brief is open in your Drive. Add a line and I'll re-read it next cycle.",
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: "r" + Date.now(),
            kind: "aria",
            body: "Got it. I'll keep an eye out and message you when something shows up.",
          },
        ]);
      }
    }, 1200);
  };

  const handleSent = () => {
    if (!introMatch) return;
    toast.push(`Sent to ${introMatch.name.split(" ")[0]}'s assistant`, "just now");
    setMessages((m) => [
      ...m,
      {
        id: "s" + Date.now(),
        kind: "system",
        body: `Sent to ${introMatch.name.split(" ")[0]}'s assistant`,
        time: "just now",
      },
    ]);
    setIntroMatch(null);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "var(--paper)",
        }}
      >
        <div className="topbar">
          <div className="topbar-title">Home</div>
          <div className="status-pill">
            <span className="dot" />
            <span>Aria is online</span>
          </div>
        </div>

        <div ref={scrollerRef} style={{ flex: 1, overflowY: "auto" }}>
          <div className="chat-column">
            {messages.map((m) => (
              <MessageRow key={m.id} msg={m} onSayHi={setIntroMatch} />
            ))}
          </div>
        </div>

        <div className="chat-input-wrap">
          <div className="chat-input-inner">
            {messages.length <= 1 && (
              <div className="suggested-pills">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="pill" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div className="chat-input">
              <textarea
                rows={1}
                placeholder="Message Aria…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
              />
              <button
                className={`send-btn ${input.trim() ? "active" : ""}`}
                onClick={() => send(input)}
                aria-label="Send"
              >
                <Icon name="arrow-up" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <RightRail />

      {introMatch && (
        <IntroPreviewModal
          match={introMatch}
          onClose={() => setIntroMatch(null)}
          onSent={handleSent}
        />
      )}
    </>
  );
}

function MessageRow({ msg, onSayHi }: { msg: Msg; onSayHi: (m: Match) => void }) {
  if (msg.kind === "aria") {
    return (
      <div className="msg-row">
        <div className="avatar" style={{ color: "var(--accent)" }}>
          <Monogram size={16} color="var(--accent)" />
        </div>
        <div className="msg-aria body">{msg.body}</div>
      </div>
    );
  }
  if (msg.kind === "user") {
    return (
      <div className="msg-row user">
        <div className="msg-user body">{msg.body}</div>
      </div>
    );
  }
  if (msg.kind === "system") {
    return (
      <div className="msg-system" style={{ paddingLeft: 40 }}>
        <span>{msg.body}</span>
        <span className="dot-sep">·</span>
        <span className="caption">{msg.time}</span>
      </div>
    );
  }
  if (msg.kind === "thinking") {
    return (
      <div className="msg-row">
        <div className="avatar" style={{ color: "var(--accent)" }}>
          <Monogram size={16} color="var(--accent)" />
        </div>
        <div className="msg-aria" style={{ padding: "14px 20px" }}>
          <span className="think-dot" />
        </div>
      </div>
    );
  }
  if (msg.kind === "match") {
    return (
      <div style={{ paddingLeft: 40 }}>
        <MatchCard match={msg.match} onSayHi={onSayHi} />
      </div>
    );
  }
  return null;
}
