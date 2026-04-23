"use client";

import { Avatar } from "./Avatar";
import type { Match } from "@/lib/mock";

export function MatchCard({
  match,
  onSayHi,
  compact = false,
}: {
  match: Match;
  onSayHi?: (m: Match) => void;
  compact?: boolean;
}) {
  const waiting = match.status === "waiting";
  return (
    <div className="match-card">
      <Avatar initial={match.initial} size="lg" />
      <div className="match-card-body">
        <div className="match-card-name">{match.name}</div>
        <div className="match-card-role">{match.role}</div>
        <div className="match-card-quote">&ldquo;{match.quote}&rdquo;</div>
        {!compact && <div className="match-card-reason">{match.reason}</div>}
      </div>
      <div className="match-card-right">
        {waiting ? (
          <button className="btn btn-secondary btn-sm" disabled>
            waiting…
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onSayHi?.(match)}
          >
            Say hi →
          </button>
        )}
        <div className="match-card-cap">
          {waiting ? `waiting for ${match.name.split(" ")[0]}'s assistant` : "sent to their assistant first"}
        </div>
      </div>
    </div>
  );
}
