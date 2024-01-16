import '../../styles/navbar.scss'
import SunSVG from '../../utils/svgs/sun';

const links = [
    { path: '#about', label: 'About' },
    { path: '#projects', label: 'Projects' },
    { path: '#contact', label: 'Contact' },
];

function Navbar() {
    return (
        <nav className="nav">
            <div className="nav_logo">
                <a href="/">Alex</a>
            </div>
            <div className="nav_links">
                {links.map((link, index) => (
                    <a key={index} href={link.path} className="nav_link">{link.label}</a>
                ))}
            </div>
            <label className="nav_status">
                Status: AVAILABLE
            </label>
        </nav>
    );
};

export default Navbar