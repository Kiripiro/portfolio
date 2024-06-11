import '../../styles/projects.scss'
import '../../styles/style.scss'

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
    function isWebsiteOnDesktop() {
        return window.innerWidth > 768 && window.innerHeight > 768 && window.navigator.userAgent.indexOf('Mobile') === -1 && window.navigator.userAgent.indexOf('Tablet') === -1;
    }
    const max = 6;
    let maxProjects = isWebsiteOnDesktop() ? repos.length : max;

    if (repos.length === 0) return (<>Loading Github repositories...</>);
    return (
        <section id="projects" className="projects">
            <div className="projects_container">
                <div className="projects_container_title">
                    <h1>Projects</h1>
                    <span className='highlight'>Each project is a milestone</span>
                </div>
                <div className="projects_container_list">
                    {repos.slice(0, maxProjects).map((repo: Repo) => (
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
                {maxProjects === max && (
                    <div className="projects_container_info">
                        <p>Check out more projects on my <a href="https://github.com/Kiripiro">GitHub</a></p>
                    </div>
                )}
            </div>
        </section >
    );
}

export default Projects