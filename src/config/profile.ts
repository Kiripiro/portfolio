export const PROFILE = {
  name: "Alexandre Tourret",
  shortName: "Alex Tourret",
  email: "contact@atourret.fr",
  linkedinUrl: "https://www.linkedin.com/in/atourret/",
  githubUrl: "https://github.com/Kiripiro",
  maltUrl: "https://www.malt.fr/profile/alexandretourret",
  cvPublicPath: "/CV_TOURRET_Alexandre_2026.pdf",
} as const;

export function getCurrentYear() {
  return new Date().getFullYear();
}
