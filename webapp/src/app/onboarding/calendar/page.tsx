"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Monogram } from "@/components/Monogram";
import { Icon } from "@/components/Icon";

export default function CalendarPage() {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnected(true);
      setConnecting(false);
    }, 900);
  };

  return (
    <div className="center-stage" style={{ position: "relative" }}>
      <div className="top-minimal">
        <Monogram size={22} color="var(--accent)" />
        <Link href="/onboarding/matches" className="btn btn-tertiary">
          Edit later
        </Link>
      </div>

      <div className="card fade-up" style={{ maxWidth: 480, width: "100%", padding: 32 }}>
        <div style={{ color: "var(--accent)", marginBottom: 16 }}>
          <Icon name="calendar" size={28} />
        </div>

        {!connected ? (
          <>
            <h2 className="display-s" style={{ marginBottom: 12 }}>
              One more thing — when are you free?
            </h2>
            <p className="body" style={{ color: "var(--ink-secondary)", marginBottom: 20 }}>
              I need calendar access so I can offer real meeting times instead of &ldquo;let me check and get back to you.&rdquo;
            </p>
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={handleConnect}
              disabled={connecting}
            >
              {connecting ? "Opening Google…" : "Let Aria see when I'm free"}
            </button>
            <p
              className="body-s"
              style={{ color: "var(--ink-muted)", marginTop: 12 }}
            >
              I only see busy and free blocks. I never see what your meetings are about.
            </p>
          </>
        ) : (
          <>
            <h2 className="display-s" style={{ marginBottom: 12 }}>
              Got it.
            </h2>
            <p className="body" style={{ color: "var(--ink-secondary)", marginBottom: 24 }}>
              I see Tuesday afternoon is clear, and most of Friday. Good enough to start.
            </p>
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={() => router.push("/onboarding/matches")}
            >
              Find me three people →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
