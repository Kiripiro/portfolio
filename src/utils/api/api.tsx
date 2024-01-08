import axios from "axios";

export async function fetchGithub() {
    interface Repo {
        id: number;
        name: string;
        description: string;
        html_url: string;
        created_at: string;
        languages: Record<string, number>;
    }

    const apiKey = import.meta.env.VITE_GITHUB_API_KEY;
    const username = import.meta.env.VITE_GITHUB_API_USERNAME;

    try {
        const response = await axios.get<Repo[]>(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${apiKey}`
            }
        });
        const sortedRepos = response.data.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA;
        });

        if (sortedRepos.find((repo) => repo.name === username))
            sortedRepos.splice(sortedRepos.findIndex((repo) => repo.name === username), 1);

        for (const repo of sortedRepos) {
            const languagesResponse = await axios.get(
                `https://api.github.com/repos/${username}/${repo.name}/languages`,
                {
                    headers: {
                        Authorization: `token ${apiKey}`
                    }
                }
            );
            // check if there is a Hack property in the response, if so, delete it
            if (languagesResponse.data.hasOwnProperty('Hack')) {
                delete languagesResponse.data.Hack;
            }
            repo.languages = languagesResponse.data;
        }

        return sortedRepos;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
}
