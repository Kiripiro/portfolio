import "../../styles/navbar.scss";
import { useSmoothScroll } from "../../utils/scroll/useSmoothScroll";

const links = [
  { path: "#about", label: "About" },
  { path: "#certifications", label: "Certifications" },
  { path: "#projects", label: "Projects" },
  { path: "#contact", label: "Contact" },
];

function Navbar() {
  const { scrollToHash } = useSmoothScroll();

  return (
    <nav className="nav">
      <div className="nav_logo">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            scrollToHash("#home");
          }}
        >
          Alex Tourret
        </a>
      </div>
      <div className="nav_links">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.path}
            onClick={(event) => {
              event.preventDefault();
              scrollToHash(link.path);
            }}
            className="nav_link ui_nav_link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
