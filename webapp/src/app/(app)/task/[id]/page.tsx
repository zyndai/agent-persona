"use client";

import { Suspense, use, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RightRail } from "@/components/RightRail";
import { Icon } from "@/components/Icon";
import { Monogram } from "@/components/Monogram";
import { SERVICE_AGENTS } from "@/lib/mock";
import { useToast } from "@/components/Toast";

function ReceiptInner({ id }: { id: string }) {
  void id;
  const search = useSearchParams();
  const agentId = search.get("agent") ?? "marriott";
  const agent = SERVICE_AGENTS.find((a) => a.id === agentId) ?? SERVICE_AGENTS[0];
  const toast = useToast();
  const [cancelled, setCancelled] = useState(false);
  const [cancelConfirm, setCancelConfirm] = useState(false);

  const cancel = () => {
    setCancelled(true);
    setCancelConfirm(false);
    toast.push("Cancelled", "refund in 3–5 days");
  };

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">Task complete</div>
        </div>
        <div className="page-container" style={{ maxWidth: 720 }}>
          <div className="msg-row" style={{ marginBottom: 20 }}>
            <div className="avatar">
              <Monogram size={16} color="var(--accent)" />
            </div>
            <div className="msg-aria body">
              Booked. Park Hyatt, ₹17,400/night for four nights. Confirmation in your email.
            </div>
          </div>

          <div
            className="card"
            style={{
              borderLeft: "2px solid var(--accent)",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span className="caption accent" style={{ letterSpacing: "1.5px" }}>
                {cancelled ? "· CANCELLED" : "· BOOKED"}
              </span>
              <span className="caption ink-muted">2m 14s</span>
            </div>

            <div
              style={{
                paddingBottom: 12,
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="display-xs"
                style={{
                  textDecoration: cancelled ? "line-through" : "none",
                  color: cancelled ? "var(--ink-muted)" : "var(--ink)",
                }}
              >
                Park Hyatt Tokyo
              </div>
              <div className="body-s ink-secondary" style={{ marginTop: 2 }}>
                Nov 10–14 · 4 nights · Deluxe room
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 12,
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 18,
                  color: "var(--accent)",
                  textDecoration: cancelled ? "line-through" : "none",
                }}
              >
                ₹69,600
              </span>
              <span className="caption ink-muted">₹76,800 − ₹7,200 saved</span>
            </div>

            <div className="caption ink-muted" style={{ marginTop: 12, letterSpacing: "1.5px" }}>
              VIA {agent.name.toUpperCase()}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 20,
              }}
            >
              <a
                href="#"
                className="btn btn-secondary btn-sm"
                onClick={(e) => e.preventDefault()}
              >
                Confirmation →
              </a>
              {!cancelled && (
                <button
                  className="btn btn-tertiary"
                  onClick={() => setCancelConfirm(true)}
                  style={{ color: "var(--danger)" }}
                >
                  Cancel
                </button>
              )}
              {!cancelled && (
                <span className="caption ink-muted" style={{ marginLeft: "auto" }}>
                  cancellable for 23h 14m
                </span>
              )}
            </div>
          </div>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Link href={`/agents/${agent.id}`} className="caption ink-muted">
              not the right fit? pick a different agent
            </Link>
          </div>
        </div>
      </div>
      <RightRail />

      {cancelConfirm && (
        <div className="overlay center" onClick={() => setCancelConfirm(false)}>
          <div className="modal center" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <h3 className="display-s" style={{ marginBottom: 12 }}>
                Cancel this booking?
              </h3>
              <p className="body ink-secondary">
                Your refund goes back to your card in 3–5 days.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-tertiary" onClick={() => setCancelConfirm(false)}>
                Never mind
              </button>
              <button className="btn btn-danger" onClick={cancel}>
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="paper-canvas" />}>
      <ReceiptInner id={id} />
    </Suspense>
  );
}
