import "../../styles/footer.scss";
import ArrowDiagonalRight from "../../utils/svgs/arrowDiagonalRight";
import Linkedin from "../../utils/svgs/linkedin";
import Github from "../../utils/svgs/github";
import Malt from "../../utils/svgs/malt";
import { enqueueSnackbar } from "notistack";
import CvLink from "../shared/cvLink";
import { PROFILE, getCurrentYear } from "../../config/profile";

function Contact() {
  const currentYear = getCurrentYear();

  function copyTextFallback(value: string) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    const didCopy = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!didCopy) {
      throw new Error("Clipboard fallback failed");
    }
  }

  async function copyToClipboard() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROFILE.email);
      } else {
        copyTextFallback(PROFILE.email);
      }

      enqueueSnackbar("Email copied to clipboard.", {
        variant: "success",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    } catch {
      enqueueSnackbar("Unable to copy email. Use contact@atourret.fr.", {
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 2600,
      });
    }
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
                  {PROFILE.email}
                </button>
                <CvLink className="contact_cv_link" />
                <div className="contact_content_socials">
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-default="true"
                    className="icon ui_icon_button"
                    aria-label="Open LinkedIn profile"
                  >
                    <Linkedin />
                  </a>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-default="true"
                    className="icon ui_icon_button"
                    aria-label="Open GitHub profile"
                  >
                    <Github />
                  </a>
                  <a
                    href={PROFILE.maltUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-default="true"
                    className="icon ui_icon_button"
                    aria-label="Open Malt profile"
                  >
                    <Malt />
                  </a>
                </div>
              </div>

              <div className="contact_meta">
                <p className="contact_status">
                  <span className="contact_status_dot" aria-hidden="true" />
                  Open to discuss your project
                </p>
                <p className="contact_location">
                  Remote friendly · Lyon, France
                </p>
                <p className="contact_response">
                  Usually replies within 24 hours
                </p>
                <a
                  href={PROFILE.maltUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact_malt_link ui_inline_link"
                >
                  Freelance profile on Malt
                </a>
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
