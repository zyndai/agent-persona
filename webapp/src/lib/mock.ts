export type Match = {
  id: string;
  name: string;
  initial: string;
  role: string;
  quote: string;
  reason: string;
  status?: "idle" | "waiting" | "accepted" | "declined";
};

export type Meeting = {
  id: string;
  withId: string;
  withName: string;
  withInitial: string;
  withRole: string;
  dateLabel: string;
  timeLabel: string;
  durationLabel: string;
  prep: string[];
  status: "upcoming" | "past" | "cancelled";
};

export type Activity = {
  id: string;
  icon: "send" | "calendar" | "check" | "eye" | "sparkle";
  text: string;
  timeLabel: string;
};

export type ChatMessage = {
  id: string;
  kind: "aria" | "user" | "system" | "match-card" | "meeting-card" | "proposal-card";
  body?: string;
  timeLabel?: string;
  cardRef?: string;
};

export type ServiceAgent = {
  id: string;
  name: string;
  tag: "Pro" | "Peer";
  category: string;
  operator: string;
  initial: string;
  color: string;
  completions: number;
  rating: number;
  median: string;
  description: string;
  reviews: { quote: string; by: string; when: string }[];
};

export const USER = {
  name: "Dillu Reddy",
  initial: "D",
  email: "dillu@studio.zynd",
  bio: "Building developer tools out of Bangalore. Deep into agent infrastructure right now.",
  tags: ["agent networks", "dev tools", "founder", "Bangalore", "early stage"],
  briefDocUrl: "https://docs.google.com/document/d/your-brief",
};

export const MATCHES: Match[] = [
  {
    id: "ravi",
    name: "Ravi Shah",
    initial: "R",
    role: "Co-founder at Lattice Labs",
    quote:
      "Spent the weekend wiring up agent-to-agent handoffs. The protocol spec is almost there.",
    reason:
      "Building in the same space as you. Just posted something very close to what you tweeted last Thursday.",
    status: "idle",
  },
  {
    id: "maya",
    name: "Maya Ortiz",
    initial: "M",
    role: "Product designer, ex-Figma",
    quote:
      "The best AI interfaces don't announce themselves. They just feel like the tool got smarter.",
    reason:
      "Thinking hard about the exact problem you're designing around right now.",
    status: "idle",
  },
  {
    id: "alex",
    name: "Alex Reyes",
    initial: "A",
    role: "Head of talent, Cohere",
    quote:
      "Looking at agentic tools for our recruiting workflow. Most are overbuilt.",
    reason:
      "Exactly the kind of person who'd use what you're building. Worth a conversation.",
    status: "idle",
  },
];

export const EXTRA_MATCHES: Match[] = [
  {
    id: "priya",
    name: "Priya Chandra",
    initial: "P",
    role: "Staff engineer at Vellum",
    quote:
      "Orchestration layers that try to own the runtime always lose to the ones that get out of the way.",
    reason:
      "Wrote something last Tuesday about the same runtime tradeoff you mentioned in your brief.",
    status: "idle",
  },
  {
    id: "leo",
    name: "Leo Marsh",
    initial: "L",
    role: "Solo founder · yc s25",
    quote:
      "Spent two days pulling apart how eval loops fail quietly. Cheaper than finding it in prod.",
    reason:
      "Shipping evals for agent systems — complementary to what you're debugging this week.",
    status: "idle",
  },
  {
    id: "nina",
    name: "Nina Rao",
    initial: "N",
    role: "Early at Substrate",
    quote:
      "Hosting agent infra still feels like 2013 webhosting. Someone should fix it.",
    reason:
      "She's halfway to an answer for the hosting problem your brief mentioned.",
    status: "idle",
  },
];

export const MEETINGS: Meeting[] = [
  {
    id: "mtg-ravi-01",
    withId: "ravi",
    withName: "Ravi Shah",
    withInitial: "R",
    withRole: "Co-founder, Lattice Labs",
    dateLabel: "Tuesday, April 28",
    timeLabel: "3:00pm",
    durationLabel: "30 minutes",
    prep: [
      "Just raised a seed round — probably thinking about hiring.",
      "Posted about agent-to-agent protocol handoffs on Thursday.",
      "Based in SF, probably open to a video call.",
    ],
    status: "upcoming",
  },
];

export const ACTIVITY: Activity[] = [
  { id: "a1", icon: "send", text: "Introduced you to Ravi", timeLabel: "12m ago" },
  { id: "a2", icon: "calendar", text: "Alex confirmed Tuesday 3pm", timeLabel: "2h ago" },
  { id: "a3", icon: "eye", text: "Checked LinkedIn for new posts", timeLabel: "4h ago" },
  { id: "a4", icon: "check", text: "Read update in your brief", timeLabel: "yesterday" },
];

export const SERVICE_AGENTS: ServiceAgent[] = [
  {
    id: "marriott",
    name: "Marriott agent",
    tag: "Pro",
    category: "Hotels",
    operator: "operated by Marriott International",
    initial: "M",
    color: "#8B3F3F",
    completions: 423,
    rating: 4.8,
    median: "₹14k",
    description:
      "Books hotels worldwide through the Marriott inventory. Good at finding deals under ₹20k/night and negotiating discounts for stays over three nights. Can't book same-day.",
    reviews: [
      { quote: "got me into a sold-out weekend in Goa", by: "anu", when: "2 weeks ago" },
      { quote: "dropped the rate by 18% after I asked", by: "kavi", when: "last month" },
      { quote: "smooth Tokyo booking, right under my cap", by: "swapnil", when: "2 weeks ago" },
    ],
  },
  {
    id: "booking",
    name: "Booking.com agent",
    tag: "Pro",
    category: "Hotels",
    operator: "operated by Booking Holdings",
    initial: "B",
    color: "#0057A1",
    completions: 1840,
    rating: 4.6,
    median: "₹11k",
    description:
      "Searches Booking.com inventory. Best when you don't care about a specific chain and want breadth. Strong at last-minute deals.",
    reviews: [
      { quote: "last-minute Bali pick, under budget", by: "ritu", when: "a month ago" },
    ],
  },
  {
    id: "expedia",
    name: "Expedia agent",
    tag: "Pro",
    category: "Hotels",
    operator: "operated by Expedia Group",
    initial: "E",
    color: "#FDB813",
    completions: 892,
    rating: 4.5,
    median: "₹13k",
    description:
      "Bundles flight + hotel well. Not the fastest on urgent bookings. Good at business travel with receipts.",
    reviews: [],
  },
  {
    id: "bigbasket",
    name: "BigBasket agent",
    tag: "Pro",
    category: "Shopping",
    operator: "operated by BigBasket",
    initial: "BB",
    color: "#6FAE3E",
    completions: 312,
    rating: 4.7,
    median: "₹1.8k",
    description:
      "Shops groceries from your nearest BigBasket. Knows your usual order and can reorder with one prompt. Doesn't handle specialty items or liquor.",
    reviews: [],
  },
  {
    id: "skyscanner",
    name: "Skyscanner agent",
    tag: "Pro",
    category: "Flights",
    operator: "operated by Skyscanner",
    initial: "S",
    color: "#0770E3",
    completions: 1104,
    rating: 4.6,
    median: "₹8k",
    description:
      "Searches flights across airlines and books direct. Best for domestic routes in India and within Asia. Doesn't do visa-on-arrival countries.",
    reviews: [],
  },
];

export const TASK_CATEGORIES = [
  {
    id: "travel",
    name: "Travel",
    icon: "plane",
    description: "Hotels, flights, transport, anything that needs booking.",
    prompts: [
      "Book me a hotel in Tokyo next month",
      "Find a flight home for Diwali",
      "Get me an Uber to the airport at 6am",
      "Cancel my Jaipur booking and refund",
    ],
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "bag",
    description: "Groceries, gifts, errands, the small logistics.",
    prompts: [
      "Order what I usually get from BigBasket",
      "Find a birthday gift for my sister, under ₹3k",
      "Restock my coffee — same as last time",
    ],
  },
  {
    id: "research",
    name: "Research",
    icon: "book",
    description: "Find, compare, summarize — I'll read so you don't have to.",
    prompts: [
      "Summarize the new Anthropic announcement",
      "Compare two Substrate hosting providers",
      "What's the market for AI infra in Bangalore?",
    ],
  },
  {
    id: "admin",
    name: "Admin",
    icon: "clipboard",
    description: "Scheduling, rescheduling, cancellations, follow-ups.",
    prompts: [
      "Reschedule tomorrow's call with Ravi",
      "Send a follow-up to last week's intros",
      "Cancel my gym membership",
    ],
  },
];

export const CONNECTORS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin",
    description:
      "Aria reads your posts and profile every few hours to keep up with what you're into. She never posts anything.",
    connected: true,
    meta: "Last read 12 minutes ago",
    actionLabel: "Let Aria read your LinkedIn",
  },
  {
    id: "brief",
    name: "Your brief",
    icon: "file",
    description:
      "A doc in your Drive where you tell Aria what's current. She re-reads whenever it changes.",
    connected: true,
    meta: "Last synced 2 hours ago",
    actionLabel: "Create my brief",
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: "calendar",
    description:
      "Aria sees your busy and free blocks so she can offer real meeting times. She never sees what your meetings are about.",
    connected: true,
    meta: "Reading your primary calendar",
    actionLabel: "Let Aria see when I'm free",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "send",
    description:
      "Text Aria from your phone. She replies in Telegram; everything syncs back here.",
    connected: false,
    meta: "",
    actionLabel: "Connect Telegram",
  },
];

export const BUDGETS = [
  { id: "travel", label: "Travel", amount: 18000, period: "month" as const, spent: 3200 },
  { id: "shopping", label: "Shopping", amount: 6000, period: "month" as const, spent: 1240 },
  { id: "research", label: "Research", amount: 0, period: "month" as const, spent: 0 },
  { id: "admin", label: "Admin", amount: 0, period: "month" as const, spent: 0 },
];

export const DEFAULT_AGENTS: Record<string, string> = {
  Hotels: "marriott",
  Shopping: "bigbasket",
  Flights: "skyscanner",
};
