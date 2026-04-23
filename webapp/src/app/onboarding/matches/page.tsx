"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Monogram } from "@/components/Monogram";
import { MatchCard } from "@/components/MatchCard";
import { IntroPreviewModal } from "@/components/IntroPreviewModal";
import { MATCHES, EXTRA_MATCHES, type Match } from "@/lib/mock";
import { useToast, ToastProvider } from "@/components/Toast";

function MatchesInner() {
  const router = useRouter();
  const toast = useToast();
  const [matches, setMatches] = useState(MATCHES);
  const [visibleCount, setVisibleCount] = useState(0);
  const [introMatch, setIntroMatch] = useState<Match | null>(null);
  const [subtitleOverride, setSubtitleOverride] = useState<string | null>(null);
  const [rerolls, setRerolls] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    matches.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 400 + i * 1400));
    });
    return () => timers.forEach(clearTimeout);
  }, [matches]);

  const handleShowMore = () => {
    if (rerolls >= 2) {
      setSubtitleOverride(
        "Let's go with one of these, or open your brief — the more you tell me, the better matches I find.",
      );
      return;
    }
    setMatches(EXTRA_MATCHES);
    setVisibleCount(0);
    setRerolls((r) => r + 1);
    setSubtitleOverride("Okay — three more.");
    setTimeout(() => setSubtitleOverride(null), 2200);
  };

  const handleSent = () => {
    if (!introMatch) return;
    toast.push(`Sent to ${introMatch.name.split(" ")[0]}'s assistant`, "just now");
    setMatches((prev) =>
      prev.map((m) => (m.id === introMatch.id ? { ...m, status: "waiting" as const } : m)),
    );
    setIntroMatch(null);
  };

  return (
    <div className="paper-canvas" style={{ position: "relative" }}>
      <div className="top-minimal">
        <Monogram size={22} color="var(--accent)" />
      </div>

      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "96px 32px 80px",
        }}
      >
        <h1 className="display-m fade-up">Three people I think you&apos;d want to meet.</h1>
        <p
          className="body-l fade-up"
          style={{
            color: "var(--ink-secondary)",
            marginTop: 8,
            animationDelay: "80ms",
          }}
        >
          {subtitleOverride ?? "Specific reasons below. If none click, tell me and I'll keep looking."}
        </p>

        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
          {matches.slice(0, visibleCount).map((m, i) => (
            <div key={m.id} className="fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <MatchCard match={m} onSayHi={setIntroMatch} />
            </div>
          ))}
        </div>

        {visibleCount === matches.length && (
          <div
            className="fade-up"
            style={{
              marginTop: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              animationDelay: "400ms",
            }}
          >
            <button className="btn btn-tertiary" onClick={handleShowMore}>
              Not the right three? Show me more.
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => router.push("/home")}
            >
              These are good, continue →
            </button>
          </div>
        )}
      </div>

      {introMatch && (
        <IntroPreviewModal
          match={introMatch}
          onClose={() => setIntroMatch(null)}
          onSent={handleSent}
        />
      )}
    </div>
  );
}

export default function MatchesPage() {
  return (
    <ToastProvider>
      <MatchesInner />
    </ToastProvider>
  );
}
