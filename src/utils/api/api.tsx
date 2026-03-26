import reposData from "../../data/repos.json";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  languages: Record<string, number>;
}

const curatedRepoNames = [
  "leaffliction",
  "total-perspective-vortex",
  "multilayer-perceptron",
  "hypertube",
  "matcha",
  "camagru",
  "ft_transcendence",
];

function getCuratedRepos(allRepos: Repo[]) {
  const repoByName = new Map(
    allRepos.map((repo) => [repo.name.toLowerCase(), repo]),
  );
  const curated = curatedRepoNames
    .map((repoName) => repoByName.get(repoName.toLowerCase()))
    .filter((repo): repo is Repo => Boolean(repo));

  return curated.length > 0 ? curated : allRepos;
}

export async function fetchRepos({
  limit,
}: {
  limit?: number;
} = {}) {
  const allRepos = reposData as Repo[];
  const curatedRepos = getCuratedRepos(allRepos);
  const repos =
    typeof limit === "number" ? curatedRepos.slice(0, limit) : curatedRepos;
  return repos;
}
