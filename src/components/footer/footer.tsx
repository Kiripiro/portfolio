import "../../styles/footer.scss";
import ArrowDiagonalRight from "../../utils/svgs/arrowDiagonalRight";
import Linkedin from "../../utils/svgs/linkedin";
import Github from "../../utils/svgs/github";
import { enqueueSnackbar } from "notistack";
import CvLink from "../shared/cvLink";

function Contact() {
  const contactEmail = "contact@atourret.fr";
  const currentYear = new Date().getFullYear();

  function copyToClipboard() {
    navigator.clipboard.writeText(contactEmail);
    enqueueSnackbar("Email copied to clipboard.", {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 2000,
    });
  }

  function handleLinkedinClick() {
    window.open("https://www.linkedin.com/in/atourret/", "_blank");
  }

  function handleGithubClick() {
    window.open("https://github.com/Kiripiro", "_blank");
  }

  return (
    <footer>
      <section id="contact" className="contact">
        <div className="contact_shell">
          <div className="contact_intro">
            <p className="section_eyebrow">Contact</p>
            <h2>Let's make something that matters.</h2>
            <p>
              From problem framing to stable release, with pragmatic
              engineering.
            </p>
          </div>

          <div className="contact_panel">
            <div className="contact_panel_main">
              <div className="contact_actions">
                <button
                  type="button"
                  className="contact_text_link ui_button ui_button_primary"
                  onClick={copyToClipboard}
                >
                  {contactEmail}
                </button>
                <CvLink className="contact_cv_link" />
                <div className="contact_content_socials">
                  <button
                    type="button"
                    data-cursor-default="true"
                    className="icon ui_icon_button"
                    onClick={handleLinkedinClick}
                    aria-label="Open LinkedIn profile"
                  >
                    <Linkedin />
                  </button>
                  <button
                    type="button"
                    data-cursor-default="true"
                    className="icon ui_icon_button"
                    onClick={handleGithubClick}
                    aria-label="Open GitHub profile"
                  >
                    <Github />
                  </button>
                </div>
              </div>

              <div className="contact_meta">
                <p className="contact_status">
                  <span className="contact_status_dot" aria-hidden="true" />
                  Available to discuss your project
                </p>
                <p className="contact_location">
                  Remote friendly · Lyon, France
                </p>
                <p className="contact_response">
                  Usually replies within 24 hours
                </p>
              </div>
            </div>

            <div className="contact_arrow_wrap" aria-hidden="true">
              <div className="contact-arrow">
                <ArrowDiagonalRight />
              </div>
            </div>
          </div>

          <div className="contact_bottom">
            <p className="contact_bottom_text">
              © {currentYear} Alexandre Tourret
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Contact;
