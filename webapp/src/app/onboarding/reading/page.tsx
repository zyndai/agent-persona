"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Monogram } from "@/components/Monogram";
import { Icon } from "@/components/Icon";

const TICKS = [
  "Reading your recent LinkedIn posts.",
  "Picking up on what you're into these days.",
  "Looking around the network for people in your orbit.",
  "Shortlisting a few worth your time.",
  "Drafting what I'd say to them.",
  "Almost there.",
];

export default function ReadingYouPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    TICKS.forEach((_, i) => {
      const delay = 300 + i * 800;
      timers.push(setTimeout(() => setVisible(i + 1), delay));
    });
    const done = setTimeout(() => router.push("/onboarding/persona"), 300 + TICKS.length * 800 + 800);
    timers.push(done);
    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <div className="center-stage">
      <div style={{ maxWidth: 480, width: "100%", marginTop: "-5vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Monogram size={28} color="var(--accent)" />
          <span
            className="display-s"
            style={{ color: "var(--ink)" }}
          >
            I&apos;m Aria. Give me a minute.
          </span>
        </div>
        <div style={{ height: 48 }} />
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
          {TICKS.map((t, i) => (
            <li
              key={t}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                opacity: visible > i ? 1 : 0,
                transform: visible > i ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 260ms var(--ease-out), transform 260ms var(--ease-out)",
                color: "var(--ink)",
              }}
            >
              <span
                style={{
                  marginTop: 4,
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                <Icon name="check" size={18} />
              </span>
              <span className="body-l">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
