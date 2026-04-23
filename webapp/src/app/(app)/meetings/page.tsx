"use client";

import Link from "next/link";
import { MEETINGS } from "@/lib/mock";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { RightRail } from "@/components/RightRail";

export default function MeetingsPage() {
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
          <div className="topbar-title">Meetings</div>
        </div>
        <div className="page-container" style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MEETINGS.length === 0 ? (
              <EmptyMeetings />
            ) : (
              MEETINGS.map((m) => (
                <Link
                  key={m.id}
                  href={`/meetings/${m.id}`}
                  className="card card-hover"
                  style={{ textDecoration: "none", display: "flex", gap: 16, alignItems: "center" }}
                >
                  <Avatar initial={m.withInitial} size="lg" />
                  <div style={{ flex: 1 }}>
                    <div className="heading">{m.withName}</div>
                    <div className="body-s ink-secondary">{m.withRole}</div>
                    <div
                      className="body-s"
                      style={{
                        marginTop: 8,
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Icon name="calendar" size={14} />
                      {m.dateLabel} · {m.timeLabel}
                    </div>
                  </div>
                  <div className="caption ink-muted">{m.durationLabel}</div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <RightRail />
    </>
  );
}

function EmptyMeetings() {
  return (
    <div style={{ textAlign: "center", padding: "80px 0", maxWidth: 400, margin: "0 auto" }}>
      <div className="display-s" style={{ marginBottom: 12 }}>
        No meetings on the books.
      </div>
      <div className="body" style={{ color: "var(--ink-secondary)", marginBottom: 20 }}>
        Say hi to someone and we&apos;ll get something scheduled.
      </div>
      <Link href="/people" className="btn btn-secondary">
        See who&apos;s worth meeting
      </Link>
    </div>
  );
}
