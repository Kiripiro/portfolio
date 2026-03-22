import { writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const OUTPUT_PATH = path.resolve(process.cwd(), "src/data/repos.json");
const username = process.env.DATA_USERNAME || "Kiripiro";
const token = process.env.DATA_TOKEN || "";
const limit = Number.parseInt(process.env.GITHUB_REPOS_LIMIT || "30", 10);
const includeForks = process.env.GITHUB_INCLUDE_FORKS === "true";
const excludedRepoNames = new Set(
  (process.env.GITHUB_EXCLUDED_REPOS || "Kiripiro")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
);

function getHeaders() {
  if (!token) return { Accept: "application/vnd.github+json" };
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
  };
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status} on ${url}`);
  }
  return response.json();
}

function sanitizeLanguages(input) {
  if (!input || typeof input !== "object") return {};
  const languages = { ...input };
  delete languages.Hack;
  return languages;
}

async function generateRepos() {
  const safeLimit = Number.isNaN(limit) ? 30 : Math.max(1, Math.min(limit, 100));
  const reposUrl = `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=${safeLimit}`;
  const repos = await fetchJson(reposUrl);

  const mapped = await Promise.all(
    repos
      .filter((repo) => (includeForks || !repo.fork) && !excludedRepoNames.has(repo.name))
      .map(async (repo) => {
        let languages = {};

        try {
          languages = await fetchJson(repo.languages_url);
        } catch (error) {
          console.warn(`Could not fetch languages for ${repo.name}. Keeping empty languages.`);
        }

        return {
          id: repo.id,
          name: repo.name,
          description: repo.description || "No description provided.",
          html_url: repo.html_url,
          created_at: repo.created_at,
          languages: sanitizeLanguages(languages),
        };
      })
  );

  return mapped;
}

async function readExistingFile() {
  if (!existsSync(OUTPUT_PATH)) return "[]\n";
  return readFile(OUTPUT_PATH, "utf8");
}

async function main() {
  try {
    if (!token && existsSync(OUTPUT_PATH)) {
      console.log("No GitHub token provided, keeping existing repos.json");
      return;
    }

    const repos = await generateRepos();
    const content = `${JSON.stringify(repos, null, 2)}\n`;
    const existing = await readExistingFile();

    if (existing === content) {
      console.log("repos.json already up-to-date");
      return;
    }

    await writeFile(OUTPUT_PATH, content, "utf8");
    console.log(`Updated ${OUTPUT_PATH} with ${repos.length} repositories.`);
  } catch (error) {
    if (!existsSync(OUTPUT_PATH)) {
      await writeFile(OUTPUT_PATH, "[]\n", "utf8");
    }
    console.warn("Could not refresh repos.json, keeping existing data.");
    console.warn(error instanceof Error ? error.message : String(error));
  }
}

main();
