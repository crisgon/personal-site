/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://cristiano.dev/",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap-index.xml"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: ["/", "/api/og/*"] }],
    additionalSitemaps: ["https://cristiano.dev/server-sitemap.xml"],
  },
};
