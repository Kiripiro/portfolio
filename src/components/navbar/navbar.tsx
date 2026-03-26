import "../../styles/navbar.scss";

const links = [
  { path: "#about", label: "About" },
  { path: "#certifications", label: "Certifications" },
  { path: "#projects", label: "Projects" },
  { path: "#contact", label: "Contact" },
];

function Navbar() {
  function scrollTo(target: string) {
    const section = document.querySelector<HTMLElement>(target);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  return (
    <nav className="nav">
      <div className="nav_logo">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            scrollTo("#home");
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
              scrollTo(link.path);
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
