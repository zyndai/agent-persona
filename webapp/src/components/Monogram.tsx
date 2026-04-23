export function Monogram({
  size = 28,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="Zynd"
      style={{ color }}
    >
      <path
        d="M7 7 C7 7 14 7 19 7 C22 7 22 10 20 12 L10 22 C8 24 10 25 13 25 L25 25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="25" cy="25" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Monogram size={22} color="var(--accent)" />
      <span className="sidebar-brand-text">Zynd</span>
    </div>
  );
}
