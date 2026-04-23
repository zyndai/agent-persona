import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zynd — Help with the part of networking you hate.",
  description:
    "Aria finds people worth meeting, reaches out on your behalf, and books the times. You just show up.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="system-theme">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&family=Geist:wght@300;400;500&family=Geist+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
