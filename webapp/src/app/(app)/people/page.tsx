"use client";

import { useState } from "react";
import { MATCHES, type Match } from "@/lib/mock";
import { MatchCard } from "@/components/MatchCard";
import { IntroPreviewModal } from "@/components/IntroPreviewModal";
import { RightRail } from "@/components/RightRail";
import { useToast } from "@/components/Toast";

export default function PeoplePage() {
  const toast = useToast();
  const [introMatch, setIntroMatch] = useState<Match | null>(null);
  const [matches, setMatches] = useState(MATCHES);

  const handleSent = () => {
    if (!introMatch) return;
    toast.push(`Sent to ${introMatch.name.split(" ")[0]}'s assistant`, "just now");
    setMatches((prev) =>
      prev.map((m) => (m.id === introMatch.id ? { ...m, status: "waiting" as const } : m)),
    );
    setIntroMatch(null);
  };

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">People</div>
        </div>
        <div className="page-container">
          <h2 className="display-s" style={{ marginBottom: 8 }}>
            People I&apos;ve lined up for you.
          </h2>
          <p className="body ink-secondary" style={{ marginBottom: 32 }}>
            Specific reasons below. Tap &ldquo;Say hi&rdquo; and I&apos;ll handle the rest.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {matches.map((m) => (
              <MatchCard key={m.id} match={m} onSayHi={setIntroMatch} />
            ))}
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
