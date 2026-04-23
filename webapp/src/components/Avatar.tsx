export function Avatar({
  initial,
  size = "md",
  tone,
}: {
  initial: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "accent" | "plain";
}) {
  const cls = size === "lg" ? "avatar lg" : size === "xl" ? "avatar xl" : size === "sm" ? "avatar" : "avatar";
  const smOverride = size === "sm" ? { width: 24, height: 24, fontSize: 11 } : undefined;
  return (
    <div
      className={cls}
      style={{
        ...smOverride,
        color: tone === "plain" ? "var(--ink-secondary)" : "var(--accent)",
      }}
    >
      {initial}
    </div>
  );
}
