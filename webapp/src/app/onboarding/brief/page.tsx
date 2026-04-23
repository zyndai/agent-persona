"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Monogram } from "@/components/Monogram";

export default function BriefPage() {
  const router = useRouter();
  const [seed, setSeed] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => router.push("/onboarding/calendar"), 1200);
  };

  return (
    <div className="paper-canvas" style={{ position: "relative" }}>
      <div className="top-minimal">
        <Monogram size={22} color="var(--accent)" />
        <Link href="/onboarding/calendar" className="btn btn-tertiary">
          Edit later
        </Link>
      </div>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(0, 400px) minmax(0, 480px)",
          gap: 48,
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 32px 80px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <div>
          <h2 className="display-s" style={{ marginBottom: 16 }}>
            I&apos;ll keep a doc in your Drive that keeps me current.
          </h2>
          <p className="body" style={{ color: "var(--ink-secondary)", marginBottom: 24 }}>
            I&apos;ll create a doc called &ldquo;My brief — for Aria&rdquo; in your Google Drive. You jot down what you&apos;re up to, who you&apos;d like to meet, what you want to avoid. I&apos;ll re-read it whenever it changes. You own the doc — open it any time.
          </p>
          <button className="btn btn-primary btn-lg" onClick={handleCreate} disabled={creating}>
            {creating ? "Creating…" : "Create my brief →"}
          </button>
          <p className="body-s" style={{ color: "var(--ink-muted)", marginTop: 12 }}>
            I&apos;ll never read anything else in your Drive.
          </p>

          <div style={{ marginTop: 32 }}>
            <label className="label" style={{ display: "block", color: "var(--ink-secondary)", marginBottom: 8 }}>
              While we&apos;re here — tell me one thing you&apos;re working on right now.
            </label>
            <input
              className="input"
              placeholder="e.g. raising a seed round, hiring my first designer, researching agent protocols"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
          </div>
        </div>

        <div
          className="card"
          style={{
            background: "var(--surface)",
            padding: 32,
            maxWidth: 480,
          }}
        >
          <div
            className="display-s"
            style={{
              fontStyle: "italic",
              marginBottom: 24,
              color: "var(--ink)",
              fontSize: 20,
            }}
          >
            My brief — for Aria
          </div>
          <DocSection title="What I'm working on" body={seed || "—"} />
          <DocSection title="Who I'd like to meet" body="—" />
          <DocSection title="What I'm avoiding right now" body="recruiters, fundraising calls, etc." />
          <DocSection title="Anything else Aria should know" body="—" />
        </div>
      </div>
    </div>
  );
}

function DocSection({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        className="label"
        style={{
          color: "var(--ink)",
          textDecoration: "underline",
          textUnderlineOffset: 4,
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {title}
      </div>
      <div className="body" style={{ color: "var(--ink-secondary)" }}>
        {body}
      </div>
    </div>
  );
}
