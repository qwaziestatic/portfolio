// Each project gets a row on the home page and its own page at /projects/<slug>/.
// To add a project, copy one block and edit it. Order here = order on the site.

export type Tone = "live" | "wip";

export interface Project {
  slug: string;
  name: string;
  nativeName?: string; // shown in Ge'ez script next to the name
  kind: string;
  summary: string;
  status: { label: string; tone: Tone };
  stack: string[];
  links: { label: string; href: string }[];
  problem: string;
  how: string;
  decisions: { title: string; body: string }[];
  limits: string[];
}

export const projects: Project[] = [
  {
    slug: "easyfilla",
    name: "EasyFilla",
    kind: "Chrome extension",
    summary:
      "Reads every page of a long form and drafts the answers from the documents you upload, then fills it in for you to review.",
    status: { label: "Final testing before store release", tone: "wip" },
    stack: ["Manifest V3", "TypeScript", "Gemini API", "Claude API"],
    links: [{ label: "View on GitHub", href: "https://github.com/qwaziestatic/EasyFilla" }],
    problem:
      "Application forms ask for facts you already have in your CV, transcripts and ID documents, spread across many pages. Typing them in again is slow, and it is easy to make mistakes.",
    how:
      "EasyFilla scans every page of a form and exports the questions as a PDF. It reads the files you upload, including scanned PDFs and photos, and drafts answers only from those files. You review each answer and see which document it came from. Then it fills the form one page at a time.",
    decisions: [
      {
        title: "Two stages, so answers stay grounded",
        body:
          "Uploaded files are first read once into a structured summary, with scans sent to the model as images. Each question is then answered only from that summary. This turned a run where 11 of 14 questions failed into one where all 14 were answered, and it is what lets the report cite a source for every answer.",
      },
      {
        title: "Sensitive fields never reach the AI",
        body:
          "Passwords, payment fields, login forms and CAPTCHAs are marked as manual-only when the form is scanned and are left out of every AI request. The extension also refuses to click any submit button, even one labelled \"Next\".",
      },
      {
        title: "Adding a second AI provider without changing behaviour",
        body:
          "Before adding Claude alongside Gemini, I captured 20 real Gemini requests and pinned them by hash in the test suite. The refactor had to keep all of them byte-identical, and it did. The suite ended at 616 assertions.",
      },
      {
        title: "Finding the real dropdown bug",
        body:
          "Google Forms dropdowns stayed on \"Choose\" after every click strategy I tried. Logging the fill step showed that the options exist in the page even while the list is closed, so the readiness check passed instantly and every click landed on a closed menu. Checking whether the list is actually open fixed it.",
      },
    ],
    limits: [
      "File-upload questions have to be done by hand.",
      "Forms drawn on a canvas or rendered as a PDF are not supported.",
      "Unusual custom widgets are filled on a best-effort basis.",
    ],
  },
  {
    slug: "meetsync",
    name: "MeetSync",
    kind: "Chrome extension",
    summary:
      "Click a meeting in Google Calendar and get a one-page briefing: the agenda, the latest emails with the attendees, and the documents that matter.",
    status: { label: "Working, source on GitHub", tone: "live" },
    stack: [
      "Manifest V3",
      "React",
      "Vite",
      "Google Calendar, Gmail and Drive APIs",
      "Claude API",
      "Gemini API",
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/qwaziestatic/meetsync" }],
    problem:
      "Before a meeting you dig through the invite, your inbox and Google Drive to remember what it is about and what was said last.",
    how:
      "Click an event in Google Calendar and MeetSync opens a side panel with a briefing card: the agenda from the invite, the latest email thread with the attendees, and related Drive documents, summarized by Claude or Gemini.",
    decisions: [
      {
        title: "Asking for less access",
        body:
          "By default it only reads Drive file names and owners. Reading document contents needs a broader permission, so it is requested only when you turn that feature on. People who never use it are never asked.",
      },
      {
        title: "A bug only real data could show",
        body:
          "In the first real test, the \"latest email\" was a calendar RSVP notification that had pushed the actual conversation down the list. The fix filters calendar mail by its sender headers and checks up to three threads. A script run against real RSVP emails confirmed which headers to trust.",
      },
      {
        title: "Links never pass through the model",
        body:
          "The model chooses documents by index from a list, and the extension builds the links itself after checking every index. The only HTML it renders, the event description, is sanitized with DOMPurify first.",
      },
    ],
    limits: [
      "Chrome only.",
      "It uses Google's restricted Gmail and Drive permissions, so a public release is capped at 100 users until it passes Google's security review.",
    ],
  },
  {
    slug: "swivel",
    name: "Swivel",
    kind: "Chrome extension",
    summary:
      "Takes the information in one tab, like an email, and types it into a form in another tab, like a new Jira ticket.",
    status: { label: "Final install check before store release", tone: "wip" },
    stack: [
      "Manifest V3",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Gemini API",
      "Vitest",
      "Playwright",
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/qwaziestatic/swivel" }],
    problem:
      "Moving information between tools by hand, reading an email and then retyping it into a ticket, is slow and error-prone. Teams call it swivel-chair work.",
    how:
      "Swivel reads the page in one tab, has an AI model turn it into structured fields, and fills those fields into a form in another tab. It needs no backend and no API integrations: it works through the pages you already have open.",
    decisions: [
      {
        title: "One message hub",
        body:
          "Every tab and the side panel talk through a single router in the background service worker. Its state is saved to session storage, so when Chrome puts the worker to sleep, it picks up where it left off.",
      },
      {
        title: "The API key stays in one place",
        body:
          "Only the service worker holds the Gemini key. The message types passed between components have no field for it, so it cannot leak into a web page by mistake.",
      },
      {
        title: "Built for pages that keep changing",
        body:
          "Gmail and Jira re-render constantly. The content scripts wait for the exact element they need before acting, and every known failure shows the user a plain-language fix.",
      },
      {
        title: "Only the permissions it needs",
        body:
          "Scripts are injected when you trigger Swivel, not on every page, and access to a site like Jira is requested the first time it is needed rather than at install.",
      },
    ],
    limits: ["Tested on the Gmail to Jira flow. Other sites need their own extractor."],
  },
  {
    slug: "laqum",
    name: "Laqum",
    nativeName: "ላቁም?",
    kind: "Mobile app and web dashboard",
    summary:
      "Parking-slot booking for Addis Ababa: drivers find and book a free slot, operators watch every slot live.",
    status: { label: "In development", tone: "wip" },
    stack: ["Expo", "React Native", "React", "Node.js", "TypeScript", "PostgreSQL", "Chapa"],
    links: [{ label: "View on GitHub", href: "https://github.com/qwaziestatic/laqum" }],
    problem:
      "Finding parking in Addis Ababa means circling the block with no idea which lots have space.",
    how:
      "Drivers see free slots on a map, book one, get directions and pay when they leave. Lot operators get a live dashboard that shows every slot as a grid, red for taken and green for free.",
    decisions: [
      {
        title: "Open maps",
        body: "The driver app uses OpenStreetMap-based maps.",
      },
      {
        title: "Local payments",
        body: "Payments go through Chapa, an Ethiopian payment gateway.",
      },
    ],
    limits: ["Not released yet."],
  },
  {
    slug: "schemaai-database-architect",
    name: "SchemaAI Database Architect",
    kind: "Web application",
    summary:
      "Turns a plain-language product idea into a reviewable relational database architecture with tables, relationships, health notes, and PostgreSQL export.",
    status: { label: "Working prototype", tone: "wip" },
    stack: ["React", "TypeScript", "Vite", "PostgreSQL", "SQL"],
    links: [{ label: "View on GitHub", href: "https://github.com/qwaziestatic/schemaai-database-architect" }],
    problem:
      "Designing a relational schema from a product idea usually means translating vague requirements into tables and relationships before anyone can review the result.",
    how:
      "SchemaAI accepts a product description, generates a normalized relational design, shows field-level references and relationship edges, and exports PostgreSQL SQL.",
    decisions: [
      {
        title: "Review before export",
        body:
          "The generated schema is presented as an inspectable design with health notes before SQL is copied or downloaded.",
      },
      {
        title: "Deterministic generation",
        body:
          "The current generator runs locally and deterministically, so the prototype does not require an API key or external service.",
      },
    ],
    limits: ["The current version covers a focused set of product patterns rather than every possible domain."],
  },
  {
    slug: "hireflow",
    name: "HireFlow",
    kind: "Full-stack job board",
    summary:
      "A job board where candidates discover roles and apply while companies manage listings, profiles, and applications.",
    status: { label: "Working application", tone: "live" },
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "JWT", "Google OAuth2"],
    links: [
      { label: "Frontend on GitHub", href: "https://github.com/qwaziestatic/hireflow-frontend" },
      { label: "Backend on GitHub", href: "https://github.com/qwaziestatic/hireflow-backend" },
    ],
    problem:
      "Job seekers and employers need different tools, but both sides need one place to manage listings, applications, profiles, and hiring progress.",
    how:
      "HireFlow combines a React frontend with a Node and Express API for job listings, applications, company profiles, authentication, and role-based dashboards.",
    decisions: [
      {
        title: "Separate client and API layers",
        body:
          "The frontend and backend live in separate repositories, keeping the interface and server responsibilities independently deployable.",
      },
      {
        title: "Multiple sign-in paths",
        body:
          "The application supports JWT authentication and Google OAuth2 for different user preferences.",
      },
    ],
    limits: ["The public repositories represent an active application project that is still evolving."],
  },
  {
    slug: "backend-project",
    name: "Commerce API",
    kind: "Backend application",
    summary:
      "A Node.js and Express backend for an online retail application, with catalog, customer, and checkout-oriented API architecture.",
    status: { label: "Working backend project", tone: "wip" },
    stack: ["Node.js", "TypeScript", "Express", "SQL"],
    links: [{ label: "View on GitHub", href: "https://github.com/qwaziestatic/Backend-project-" }],
    problem:
      "A commerce product needs reliable server-side boundaries for catalog data, customer records, and checkout workflows.",
    how:
      "The project exposes a REST API structured around an online retail domain, with a Node.js and Express service backed by relational data.",
    decisions: [
      {
        title: "API-first structure",
        body:
          "The backend keeps business operations behind explicit REST endpoints so a web or mobile client can consume the same service.",
      },
      {
        title: "Relational data model",
        body:
          "Catalog, customer, and checkout concepts are modeled as related records rather than being embedded in client-only state.",
      },
    ],
    limits: ["The repository is an active backend project and continues to evolve."],
  },
];
