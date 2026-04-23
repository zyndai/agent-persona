"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SettingsNav } from "@/components/SettingsNav";
import { Avatar } from "@/components/Avatar";
import { RightRail } from "@/components/RightRail";
import { Icon } from "@/components/Icon";
import { USER } from "@/lib/mock";
import { useToast } from "@/components/Toast";

export default function YouPage() {
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = useState(USER.name);
  const [bio, setBio] = useState(USER.bio);
  const [tags, setTags] = useState(USER.tags);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [typedName, setTypedName] = useState("");

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.push("Caught up on your LinkedIn");
    }, 1600);
  };

  const handleDelete = () => {
    if (typedName.trim() !== name.trim()) return;
    router.push("/");
  };

  return (
    <>
      <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
        <div className="topbar">
          <div className="topbar-title">Settings</div>
        </div>
        <SettingsNav />
        <div className="page-container">
          <h2 className="display-s" style={{ marginBottom: 8 }}>
            You
          </h2>
          <p className="body ink-secondary" style={{ marginBottom: 32 }}>
            How I&apos;ll describe you to people I think you should meet.
          </p>

          <div className="card" style={{ padding: 32, textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <Avatar initial={name[0] ?? "A"} size="xl" />
            </div>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ textAlign: "center", fontWeight: 500, fontSize: 17, background: "transparent", border: "1px dashed transparent" }}
            />
            <textarea
              className="input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              style={{
                textAlign: "center",
                background: "transparent",
                border: "1px dashed transparent",
                resize: "none",
                marginTop: 8,
                fontFamily: "var(--font-body)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              {tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            <h3 className="heading" style={{ marginBottom: 4 }}>
              What I&apos;ve picked up lately
            </h3>
            <p className="body-s ink-secondary" style={{ marginBottom: 16 }}>
              Topics I&apos;ve noticed in your posts over the last two weeks.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["agent networks", "founder advice", "protocol design", "productivity tools", "evals", "runtime infra"].map((topic) => (
                <span key={topic} className="tag tag-muted">
                  {topic}
                </span>
              ))}
            </div>
            <button
              className="btn btn-tertiary"
              style={{ marginTop: 16 }}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <Icon name="refresh" size={12} />
              {refreshing ? "Looking again…" : "Refresh what I know"}
            </button>
          </div>

          <div
            className="card"
            style={{ background: "var(--danger-soft)", borderColor: "rgba(168, 68, 60, 0.2)" }}
          >
            <h3 className="heading" style={{ color: "var(--danger)", marginBottom: 8 }}>
              Delete account
            </h3>
            <p className="body-s" style={{ color: "var(--ink-secondary)", marginBottom: 16 }}>
              Deleting removes your brief, your matches, your meetings, and your login. You can sign back in later with the same LinkedIn or Google account, but you&apos;ll start fresh.
            </p>
            <button className="btn btn-danger" onClick={() => setDeleteConfirm(true)}>
              Delete my account
            </button>
          </div>

        </div>
      </div>
      <RightRail />

      {deleteConfirm && (
        <div className="overlay center" onClick={() => setDeleteConfirm(false)}>
          <div className="modal center" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <h3 className="display-s" style={{ marginBottom: 12 }}>
                Delete your account?
              </h3>
              <p className="body ink-secondary" style={{ marginBottom: 16 }}>
                This removes everything — your brief, your conversations, your scheduled meetings. It can&apos;t be undone.
              </p>
              <label className="label ink-secondary" style={{ display: "block", marginBottom: 6 }}>
                Type your name to confirm
              </label>
              <input
                className="input"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder={name}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-tertiary" onClick={() => setDeleteConfirm(false)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                disabled={typedName.trim() !== name.trim()}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
