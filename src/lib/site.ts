const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  .replace(/\/+$/, "");

export const siteConfig = {
  name: "Stephen Murya",
  alternateName: "Smiz",
  title: "Stephen Murya | Product Designer & Systems Architect",
  description:
    "Stephen Murya is a product designer and systems architect crafting intuitive interfaces, scalable design systems, and clear software experiences.",
  url: siteUrl,
  email: "stephenmurya@gmail.com",
  githubUrl: "https://github.com/stephenmurya",
  role: "Product Designer & Systems Architect",
};
