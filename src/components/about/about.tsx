import "../../styles/about.scss";
import MailSVG from "../../utils/svgs/mail";
import Malt from "../../utils/svgs/malt";
import Banner from "./banner";
import SectionIntro from "../shared/sectionIntro";
import { PROFILE } from "../../config/profile";

function About() {
  return (
    <section id="about" className="about_section">
      <div className="about_content">
        <div className="about_content_intro">
          <div className="about_identity">
            <SectionIntro
              eyebrow="About"
              title="Software engineer with a product mindset."
              subtitle="Building solid foundations and growing through real-world projects."
              className="about_section_intro"
            />

            <div className="about_copy">
              <p>
                I'm <span className="highlight">Alexandre</span> (Alex), a
                software engineer based in Lyon. I currently work as a{" "}
                <span className="highlight">Backend Engineer at Fanatics</span>,
                where I contribute to product features from technical design to
                production release.
              </p>
              <p>
                During my studies at{" "}
                <span className="highlight">42 School</span>, I worked at
                <span className="highlight"> Onepoint</span> across full-stack
                and AI/automation projects, learning to execute under real
                constraints, clear scope, and tight timelines.
              </p>
              <p>
                My focus today is to build maintainable systems, improve
                developer experience, and keep progressing on code quality,
                reliability, and team collaboration.
              </p>
            </div>

            <div className="about_glance" aria-label="Professional snapshot">
              <p>
                <span>Now:</span> Backend Engineer at Fanatics
              </p>
              <p>
                <span>Background:</span> 42 School + Onepoint
              </p>
              <p>
                <span>Focus:</span> Full-stack delivery, quality, and continuous
                growth
              </p>
            </div>

            <div className="about_content_button">
              <a
                href={`mailto:${PROFILE.email}`}
                className="about_content_button_link ui_button ui_button_secondary"
                data-cursor-hero="yellow"
              >
                <span>Start a discussion</span>
                <span className="ui_button_icon" aria-hidden="true">
                  <MailSVG />
                </span>
              </a>
              <a
                href={PROFILE.maltUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="about_content_button_link ui_button ui_button_primary"
                data-cursor-hero="black"
              >
                <span>View Malt profile</span>
                <span className="ui_button_icon" aria-hidden="true">
                  <Malt />
                </span>
              </a>
            </div>
          </div>
          <aside
            className="about_content_visual"
            aria-label="Portrait of Alexandre"
          >
            <img
              src="/moi-optimized.jpg"
              alt="Portrait of Alexandre Tourret"
              loading="lazy"
            />
          </aside>
        </div>

        <div className="about_content_skills">
          <Banner />
          <div className="about_content_skills_list">
            <div className="about_content_skills_list_item">
              <div className="about_content_skills_list_item_container">
                <span>1/</span>
                <h3 className="about_content_skills_list_item_title">
                  Feature Development
                </h3>
                <p className="about_content_skills_list_item_text">
                  Contributing from design discussions to rollout and follow-up
                </p>
              </div>
            </div>
            <div className="about_content_skills_list_item">
              <div className="about_content_skills_list_item_container">
                <span>2/</span>
                <h3 className="about_content_skills_list_item_title">
                  Systems & Quality
                </h3>
                <p className="about_content_skills_list_item_text">
                  Architecture, testing, refactoring, observability, and
                  long-term maintainability
                </p>
              </div>
            </div>
            <div className="about_content_skills_list_item">
              <div className="about_content_skills_list_item_container">
                <span>3/</span>
                <h3 className="about_content_skills_list_item_title">
                  Applied AI
                </h3>
                <p className="about_content_skills_list_item_text">
                  Hands-on AI/automation initiatives integrated into real team
                  workflows
                </p>
              </div>
            </div>
            <div className="about_content_skills_list_item">
              <div className="about_content_skills_list_item_container">
                <span>4/</span>
                <h3 className="about_content_skills_list_item_title">
                  Technical Toolkit
                </h3>
                <p className="about_content_skills_list_item_text">
                  Elixir, GraphQL, Java, TypeScript, Python, Docker, CI/CD,
                  DataDog
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
