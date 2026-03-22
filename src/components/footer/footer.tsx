import '../../styles/footer.scss'
import ArrowDiagonalRight from '../../utils/svgs/arrowDiagonalRight';
import Linkedin from '../../utils/svgs/linkedin';
import Github from '../../utils/svgs/github';
import { enqueueSnackbar } from 'notistack';
import { Tooltip } from 'react-tooltip';

function Contact() {
    const contactEmail = 'contact@atourret.fr';
    const currentYear = new Date().getFullYear();

    function copyToClipboard() {
        navigator.clipboard.writeText(contactEmail);
        enqueueSnackbar('Email copied to clipboard !', { variant: 'success', preventDuplicate: true, autoHideDuration: 2000 });
    }


    function handleLinkedinClick() {
        window.open('https://www.linkedin.com/in/atourret/', '_blank');
    }

    function handleGithubClick() {
        window.open('https://github.com/Kiripiro', '_blank');
    }

    return (
        <footer>
            <section id="contact" className="contact">
                <div className="contact_content_title">
                    <h1>Got a project in mind ?</h1>
                    <p>Let's connect !</p>
                </div>
                <div className="contact_content">
                    <div>
                        <p className="contact_text_link" onClick={copyToClipboard}>{contactEmail}</p>
                        <div className="contact_content_socials">
                            <div data-tooltip-id="linkedin" data-tooltip-content="Linkedin" className='icon' onClick={handleLinkedinClick}>
                                <Linkedin />
                            </div>
                            <div data-tooltip-id="github" data-tooltip-content="Github" className='icon' onClick={handleGithubClick}>
                                <Github />
                            </div>
                            <Tooltip id="linkedin" />
                            <Tooltip id="github" />
                        </div>
                    </div>
                    <div className='contact-arrow'>
                        <ArrowDiagonalRight />
                    </div>
                    <div className="contact_bottom">
                        <p className='contact_bottom_text'>© {currentYear} Alexandre Tourret</p>
                    </div>
                </div>
            </section>
        </footer>
    );
}

export default Contact;