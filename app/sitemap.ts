import type { MetadataRoute } from "next";

const BASE_URL = "https://dive-dispatch.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Root scaffolding map
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // Public pages
    { url: `${BASE_URL}/landing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/signin`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // Customer portal
    { url: `${BASE_URL}/customer`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/customer/medical`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/customer/liability`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/customer/equipment`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/customer/confirmation`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/customer/expired`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },

    // Operator tier dashboards
    { url: `${BASE_URL}/dc`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/dc/booking/new`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/agent`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/liveaboard`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/resort`, lastModified: now, changeFrequency: "daily", priority: 0.8 },

    // Resource tier dashboards
    { url: `${BASE_URL}/instructor`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/boat`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/gear`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/pool`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/air`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/site`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // Shared pages
    { url: `${BASE_URL}/settings`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
