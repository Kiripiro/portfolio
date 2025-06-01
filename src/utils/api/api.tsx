import axios from "axios";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  languages: Record<string, number>;
}

export async function fetchGithub({
  limit = 5,
  fetchAll = false,
  onAllReposFetched,
}: {
  limit?: number;
  fetchAll?: boolean;
  onAllReposFetched?: (repos: Repo[]) => void;
} = {}) {
  const apiKey = import.meta.env.VITE_GITHUB_API_KEY;
  const username = import.meta.env.VITE_GITHUB_API_USERNAME;

  try {
    const response = await axios.get<Repo[]>(
      `https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=${limit}`,
      { headers: { Authorization: `token ${apiKey}` } }
    );
    let repos = response.data;

    await Promise.all(
      repos.map(async (repo) => {
        const languagesResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/languages`,
          { headers: { Authorization: `token ${apiKey}` } }
        );
        if (languagesResponse.data.hasOwnProperty("Hack")) {
          delete languagesResponse.data.Hack;
        }
        repo.languages = languagesResponse.data;
      })
    );

    if (fetchAll && typeof onAllReposFetched === "function") {
      setTimeout(async () => {
        const allResponse = await axios.get<Repo[]>(
          `https://api.github.com/users/${username}/repos?sort=created&direction=desc`,
          { headers: { Authorization: `token ${apiKey}` } }
        );
        let allRepos = allResponse.data;
        allRepos = allRepos.filter((repo) => repo.name !== "Kiripiro");

        await Promise.all(
          allRepos.map(async (repo) => {
            const languagesResponse = await axios.get(
              `https://api.github.com/repos/${username}/${repo.name}/languages`,
              { headers: { Authorization: `token ${apiKey}` } }
            );
            if (languagesResponse.data.hasOwnProperty("Hack")) {
              delete languagesResponse.data.Hack;
            }
            repo.languages = languagesResponse.data;
          })
        );
        onAllReposFetched(allRepos);
      }, 0);
    }

    return repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}
