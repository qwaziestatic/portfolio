// Newest first. `verifyUrl` is the public Credly link (null if there isn't one).
// `image` points to the scan in public/certificates/.

export interface Certificate {
  title: string;
  issuer: string;
  date: string; // YYYY-MM-DD
  detail?: string;
  serial?: string;
  image: string;
  verifyUrl: string | null;
}

export const certificates: Certificate[] = [
  {
    title: "Full Stack Software Developer Program",
    issuer: "Addis Ababa University, School of Information Technology and Engineering",
    date: "2026-05-30",
    detail: "120 hours of training in front-end, back-end and database development, and DevSecOps.",
    serial: "AAU-CTBE-SiTE-FSD-10",
    image: "/certificates/aau-full-stack-software-developer.jpg",
    verifyUrl: null,
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy and JS Institute",
    date: "2026-01-06",
    image: "/certificates/javascript-essentials-1.jpg",
    verifyUrl: "https://www.credly.com/badges/b290bafd-3296-459a-9f9f-e1ed4422b6f6/public_url",
  },
  {
    title: "CSS Essentials",
    issuer: "Cisco Networking Academy and JS Institute",
    date: "2026-01-06",
    image: "/certificates/css-essentials.jpg",
    verifyUrl: "https://www.credly.com/badges/98d54238-1cec-45c0-b408-918c87432385/public_url",
  },
  {
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy and JS Institute",
    date: "2025-12-29",
    image: "/certificates/html-essentials.jpg",
    verifyUrl: "https://www.credly.com/badges/346b623e-4f93-4367-abe3-938d305612b4/public_url",
  },
];
