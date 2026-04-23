"use client";

import { redirect } from "next/navigation";

export default function AgentsIndex() {
  redirect("/settings/agents");
}
