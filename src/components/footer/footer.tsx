import '../../styles/footer.scss'
import ArrowDiagonalRight from '../../utils/svgs/arrowDiagonalRight';
import Linkedin from '../../utils/svgs/linkedin';
import Github from '../../utils/svgs/github';
import ReadCv from '../../utils/svgs/read';
import { enqueueSnackbar } from 'notistack';
import { Tooltip } from 'react-tooltip';

function Contact() {
    function copyToClipboard() {
        navigator.clipboard.writeText('alexandre.tourretpro@gmail.com');
        enqueueSnackbar('Email copied to clipboard !', { preventDuplicate: true, autoHideDuration: 2000 });
    }


    function handleLinkedinClick() {
        window.open('https://www.linkedin.com/in/atourret/', '_blank');
    }

    function handleGithubClick() {
        window.open('https://github.com/Kiripiro', '_blank');
    }

    function handleReadCvClick() {
        window.open('https://read.cv/atourret', '_blank');
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
                        <p className="contact_text_link" onClick={copyToClipboard}>alexandre.tourretpro@gmail.com</p>
                        <div className="contact_content_socials">
                            <div data-tooltip-id="linkedin" data-tooltip-content="Linkedin" className='icon' onClick={handleLinkedinClick}>
                                <Linkedin />
                            </div>
                            <div data-tooltip-id="github" data-tooltip-content="Github" className='icon' onClick={handleGithubClick}>
                                <Github />
                            </div>
                            <div data-tooltip-id="read.cv" data-tooltip-content="Read.cv" className='icon' onClick={handleReadCvClick}>
                                <ReadCv />
                            </div>
                            <Tooltip id="linkedin" />
                            <Tooltip id="github" />
                            <Tooltip id="read.cv" />
                        </div>
                    </div>
                    <div className='contact-arrow'>
                        <ArrowDiagonalRight />
                    </div>
                    <div className="contact_bottom">
                        <p className='contact_bottom_text'>© 2024 Alexandre Tourret</p>
                    </div>
                </div>
            </section>
        </footer>
    );
}

export default Contact;