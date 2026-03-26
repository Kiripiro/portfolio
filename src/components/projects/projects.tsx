import "../../styles/projects.scss";
import "../../styles/style.scss";
import SectionIntro from "../shared/sectionIntro";

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
function Projects({
  repos,
  isDataFetched,
}: {
  repos: Repo[];
  isDataFetched: boolean;
}) {
  const skeletonRows = Array.from({ length: 6 });

  return (
    <section id="projects" className="projects">
      <div className="projects_container">
        <SectionIntro
          eyebrow="Projects"
          title="Selected Work"
          subtitle="Built under real constraints, with clear trade-offs."
          titleTag="h2"
          className="projects_section_intro"
        />
        <div className="projects_container_list">
          {!isDataFetched ? (
            skeletonRows.map((_, index) => (
              <div
                className="projects_container_list_item loading"
                key={`skeleton-${index}`}
              >
                <div className="projects_container_list_item_container">
                  <h3 className="projects_container_list_item_title skeleton-line skeleton-title"></h3>
                  <div className="projects_container_bottom">
                    <p className="projects_container_list_item_text skeleton-line skeleton-text"></p>
                    <div className="projects_container_list_item_tags">
                      <div className="projects_container_list_item_tag skeleton-tag"></div>
                      <div className="projects_container_list_item_tag skeleton-tag"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : repos.length > 0 ? (
            repos.map((repo: Repo) => (
              <a
                className="projects_container_list_item"
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="projects_container_list_item_container">
                  <h3 className="projects_container_list_item_title">
                    {repo.name}
                  </h3>
                  <div className="projects_container_bottom">
                    <p className="projects_container_list_item_text">
                      {repo.description}
                    </p>
                    <div className="projects_container_list_item_tags">
                      {Object.keys(repo.languages).map((language) => (
                        <div
                          className="projects_container_list_item_tag"
                          key={language}
                        >
                          <p>{language}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="projects_container_info">
              <p>
                Projects data is temporarily unavailable. You can still visit my{" "}
                <a className="ui_inline_link" href="https://github.com/Kiripiro" target="_blank" rel="noreferrer">GitHub</a>.
              </p>
            </div>
          )}
        </div>
        <div className="projects_cta" aria-label="More projects on GitHub">
          <div className="projects_cta_text">
            <p className="projects_cta_title">Want to go deeper?</p>
            <p className="projects_cta_subtitle">
              Explore full repositories, commit history, and technical details.
            </p>
          </div>
          <a
            className="projects_cta_button ui_button ui_button_primary"
            href="https://github.com/Kiripiro"
            target="_blank"
            rel="noreferrer"
          >
            Browse GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
