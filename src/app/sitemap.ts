import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio-data";

const siteUrl = "https://omarrez2.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1, images: [`${siteUrl}/images/omar-portrait-suit-v2.webp`] },
    { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.8, images: [`${siteUrl}/images/omar-portrait-suit-v2.webp`] },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/certificates`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
    images: [`${siteUrl}${project.image}`],
  }));

  return [...corePages, ...projectPages];
}
