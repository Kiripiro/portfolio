const principles = [
  {
    title: "Architecture-first",
    detail: "Clarity before complexity.",
  },
  {
    title: "Outcome-oriented",
    detail: "Short loops, real outcomes.",
  },
  {
    title: "Quality-driven",
    detail: "Tests, observability, reliability.",
  },
  {
    title: "AI-aware",
    detail: "Pragmatic automation where it helps.",
  },
];

function Banner() {
  return (
    <div className="banner about_principles" aria-label="How I work">
      <p className="about_principles_label">How I work</p>
      <div className="about_principles_grid">
        {principles.map((principle) => (
          <article className="about_principle_item" key={principle.title}>
            <p className="about_principle_title">{principle.title}</p>
            <p className="about_principle_detail">{principle.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Banner;
