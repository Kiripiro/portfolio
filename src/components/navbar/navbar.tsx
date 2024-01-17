import '../../styles/navbar.scss'
import LocomotiveScroll from 'locomotive-scroll';


const links = [
    { path: '#about', label: 'About' },
    { path: '#projects', label: 'Projects' },
    { path: '#contact', label: 'Contact' },
];

function Navbar() {
    const locomotiveScroll = new LocomotiveScroll();

    function scrollTo(params: { target: string; options?: any }) {
        const { target, options } = params;
        locomotiveScroll.scrollTo(target, options);
    }

    return (
        <nav className="nav">
            <div className="nav_logo">
                <a href="/">Alex</a>
            </div>
            <div className="nav_links">
                {links.map((link, index) => (
                    <a key={index} href={link.path} onClick={() => scrollTo({ target: link.path, options: { duration: 1.2 } })} className="nav_link">{link.label}</a>
                ))}
            </div>
            <label className="nav_status">
                Status: AVAILABLE
            </label>
        </nav>
    );
};

export default Navbar