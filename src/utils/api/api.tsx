import reposData from "../../data/repos.json";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  languages: Record<string, number>;
}

export async function fetchRepos({
  limit,
}: {
  limit?: number;
} = {}) {
  const allRepos = reposData as Repo[];
  const repos = typeof limit === "number" ? allRepos.slice(0, limit) : allRepos;
  return repos;
}
