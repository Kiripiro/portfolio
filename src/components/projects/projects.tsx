import '../../styles/projects.scss'

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    created_at: string;
    languages: Record<string, number>;
}

/**
 * Renders a section containing a list of projects.
 * Each project is displayed as a clickable item and includes the project name, description, 
 * and tags representing the programming languages used.
 * 
 * @component
 * 
 * @param {Object[]} repos - An array of `Repo` objects representing the projects to be displayed.
 * 
 * @returns {JSX.Element} The rendered component.
 */
function Projects({ repos }: { repos: Repo[] }) {
    console.log(repos);
    if (repos.length === 0) return (<>Error fetching Github repositories</>);
    return (
        <section id="projects" className="projects">
            <div className="projects_container">
                <div className="projects_container_title">
                    <h1>Projects</h1>
                    <p>Each project is a milestone</p>
                </div>
                <div className="projects_container_list">
                    {repos.map((repo: Repo) => (
                        <div id="target-div" className="projects_container_list_item" key={repo.id} onClick={() => { window.open(repo.html_url, "__blank") }}>
                            <div className="projects_container_list_item_container">
                                <h3 className="projects_container_list_item_title">{repo.name}</h3>
                                <div className="projects_container_bottom">
                                    <p className="projects_container_list_item_text">{repo.description}</p>
                                    <div className="projects_container_list_item_tags">
                                        {Object.keys(repo.languages).map((language) => (
                                            <div className="projects_container_list_item_tag" key={language}>
                                                <p>{language}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}

export default Projects