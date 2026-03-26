interface SectionIntroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  titleTag?: "h1" | "h2";
  className?: string;
}

function SectionIntro({
  title,
  subtitle,
  eyebrow,
  titleTag = "h2",
  className,
}: SectionIntroProps) {
  const Title = titleTag;
  const rootClassName = className
    ? `section_intro ${className}`
    : "section_intro";

  return (
    <div className={rootClassName}>
      {eyebrow ? <p className="section_eyebrow">{eyebrow}</p> : null}
      <Title className="section_intro_title">{title}</Title>
      {subtitle ? <p className="section_intro_subtitle">{subtitle}</p> : null}
    </div>
  );
}

export default SectionIntro;
