import '../../styles/about.css'
import MailSVG from "../../utils/svgs/mail";
import Banner from './banner';

function About() {
    return (
        <section id="about" className="about_section">
            <div className="about_content">
                <div className="about_content_text">
                    <p className="about_content_text_paragraph">
                        Enchanté ! <br></br>
                        My name is Alexandre - you can call me Alex, a french creative junior full stack developer with a passion for web development.<br></br>
                        As a 42 school student, I've been learning to code for 3 years now. <br></br>
                        I'm currently looking for a job or an internship as a junior developer.<br></br>
                        You can also contact me if you want to talk about a freelance project !
                    </p>
                </div>
                <div className="about_content_button">
                    <a href="mailto:alexandre.tourretpro@gmail.com" className="about_content_button_link">
                        <div className="about_content_button_link_text_container">
                            <p className="about_content_button_link_text">Let's have a chat !</p>
                        </div>
                        <MailSVG />
                    </a>
                </div>
                <div className="about_content_skills">
                    <Banner />
                    <div className="about_content_skills_list">
                        <div className="about_content_skills_list_item">
                            <div className="about_content_skills_list_item_container">
                                <span>1/</span>
                                <h3 className="about_content_skills_list_item_title">Languages</h3>
                                <p className="about_content_skills_list_item_text">C, C++, HTML, CSS, Javascript, Typescript, PHP</p>
                            </div>
                        </div>
                        <div className="about_content_skills_list_item">
                            <div className="about_content_skills_list_item_container">
                                <span>2/</span>
                                <h3 className="about_content_skills_list_item_title">Frameworks</h3>
                                <p className="about_content_skills_list_item_text">Node.js, React, Angular, NestJS, Bootstrap, Bulma</p>
                            </div>
                        </div>
                        <div className="about_content_skills_list_item">
                            <div className="about_content_skills_list_item_container">
                                <span>3/</span>
                                <h3 className="about_content_skills_list_item_title">Databases</h3>
                                <p className="about_content_skills_list_item_text">MySQL, PostgreSQL</p>
                            </div>
                        </div>
                        <div className="about_content_skills_list_item">
                            <div className="about_content_skills_list_item_container">
                                <span>4/</span>
                                <h3 className="about_content_skills_list_item_title">Tools</h3>
                                <p className="about_content_skills_list_item_text">Git, Docker, Nginx, Apache, Postman, Notion, Wordpress</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default About;
