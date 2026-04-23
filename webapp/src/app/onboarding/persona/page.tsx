"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Monogram } from "@/components/Monogram";
import { Avatar } from "@/components/Avatar";
import { Icon } from "@/components/Icon";
import { USER } from "@/lib/mock";

export default function PersonaPage() {
  const router = useRouter();
  const [name, setName] = useState(USER.name);
  const [bio, setBio] = useState(USER.bio);
  const [tags, setTags] = useState(USER.tags);
  const [adding, setAdding] = useState(false);
  const [newTag, setNewTag] = useState("");

  const commitTag = () => {
    if (newTag.trim()) setTags([...tags, newTag.trim()]);
    setNewTag("");
    setAdding(false);
  };

  return (
    <div className="center-stage" style={{ position: "relative" }}>
      <div className="top-minimal">
        <Monogram size={22} color="var(--accent)" />
        <Link href="/onboarding/brief" className="btn btn-tertiary">
          Edit later
        </Link>
      </div>

      <div style={{ maxWidth: 520, width: "100%", marginTop: "-4vh" }}>
        <h2 className="display-s" style={{ textAlign: "center", marginBottom: 24 }}>
          This is how I&apos;ll describe you.
        </h2>

        <div className="card" style={{ padding: 32, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Avatar initial={name[0] ?? "A"} size="xl" />
          </div>

          <input
            className="input"
            style={{
              textAlign: "center",
              fontWeight: 500,
              fontSize: 17,
              background: "transparent",
              border: "1px dashed transparent",
              marginBottom: 8,
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="input"
            style={{
              textAlign: "center",
              background: "transparent",
              border: "1px dashed transparent",
              marginBottom: 16,
              resize: "none",
              fontFamily: "var(--font-body)",
              fontSize: 14.5,
              lineHeight: 1.5,
              minHeight: 60,
            }}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              justifyContent: "center",
            }}
          >
            {tags.map((t) => (
              <span key={t} className="tag" style={{ cursor: "pointer" }}>
                {t}
              </span>
            ))}
            {adding ? (
              <input
                autoFocus
                className="tag"
                style={{ border: "1px solid var(--border-strong)", padding: "4px 10px", minWidth: 80 }}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitTag();
                  if (e.key === "Escape") {
                    setNewTag("");
                    setAdding(false);
                  }
                }}
                onBlur={commitTag}
              />
            ) : (
              <button
                className="tag tag-muted"
                onClick={() => setAdding(true)}
                aria-label="Add tag"
                style={{ cursor: "pointer" }}
              >
                <Icon name="plus" size={12} />
              </button>
            )}
          </div>
        </div>

        <div
          className="body-s ink-muted"
          style={{ textAlign: "center", marginTop: 16, fontStyle: "italic" }}
        >
          Tweak anything. Or leave it — I can always adjust later.
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 32, gap: 12 }}>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => router.push("/onboarding/brief")}
          >
            This is me →
          </button>
          <Link href="/onboarding/brief" className="btn btn-tertiary">
            Change something
          </Link>
        </div>
      </div>
    </div>
  );
}
