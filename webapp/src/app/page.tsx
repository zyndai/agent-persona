"use client";

import Link from "next/link";
import { Monogram } from "@/components/Monogram";
import { Icon } from "@/components/Icon";

export default function LandingPage() {
  return (
    <div className="paper-canvas" style={{ position: "relative" }}>
      <div
        style={{
          height: 72,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Monogram size={20} color="var(--accent)" />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 18,
              color: "var(--ink)",
            }}
          >
            Zynd
          </span>
        </div>
        <Link href="/onboarding/reading" className="btn btn-tertiary">
          Sign in
        </Link>
      </div>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 96,
          paddingBottom: 120,
        }}
      >
        <div
          style={{
            maxWidth: 640,
            width: "100%",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <div
            className="fade-up"
            style={{
              animationDelay: "0ms",
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Monogram size={28} color="var(--accent)" />
          </div>

          <h1
            className="display-l fade-up"
            style={{ animationDelay: "60ms", color: "var(--ink)" }}
          >
            Help with the part of networking you hate.
          </h1>

          <p
            className="body-l fade-up"
            style={{
              animationDelay: "120ms",
              color: "var(--ink-secondary)",
              maxWidth: 520,
              margin: "24px auto 0",
            }}
          >
            Aria finds people worth meeting, reaches out on your behalf, and books the times. You just show up.
          </p>

          <div
            className="fade-up"
            style={{
              animationDelay: "180ms",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 360,
              margin: "40px auto 0",
            }}
          >
            <Link href="/onboarding/reading" className="btn btn-primary btn-lg btn-block">
              <Icon name="linkedin" size={16} />
              Continue with LinkedIn
            </Link>
            <Link href="/onboarding/reading" className="btn btn-secondary btn-lg btn-block">
              <Icon name="google" size={16} />
              Continue with Google
            </Link>
          </div>

          <div
            className="fade-up"
            style={{
              animationDelay: "240ms",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginTop: 96,
              textAlign: "left",
            }}
          >
            <FeatureLine
              title="Finds people worth meeting."
              body="Reads your posts, scans the network, surfaces three humans worth a coffee."
            />
            <FeatureLine
              title="Reaches out so you don't have to."
              body="No cold DMs. Her agent talks to their agent first."
            />
            <FeatureLine
              title="Books the meeting."
              body="You approve a time, Aria puts it on your calendar."
            />
          </div>
        </div>
      </main>

      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid var(--border-subtle)",
          background: "var(--paper)",
        }}
      >
        <div
          className="caption"
          style={{ color: "var(--ink-muted)" }}
        >
          324 people met someone new on Zynd this week.
        </div>
      </footer>
    </div>
  );
}

function FeatureLine({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="heading" style={{ fontSize: 15, fontWeight: 500 }}>
        {title}
      </div>
      <div
        className="body-s"
        style={{ color: "var(--ink-secondary)", marginTop: 4 }}
      >
        {body}
      </div>
    </div>
  );
}
