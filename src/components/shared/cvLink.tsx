import type { AnchorHTMLAttributes, MouseEvent } from "react";
import ReadCv from "../../utils/svgs/read";
import { PROFILE } from "../../config/profile";

type CvLinkVariant = "button" | "icon";

interface CvLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: CvLinkVariant;
  label?: string;
}

function CvLink({
  variant = "button",
  label = "Download CV",
  className,
  onClick,
  ...props
}: CvLinkProps) {
  const classes =
    variant === "icon"
      ? `cv_link_icon ${className ?? ""}`.trim()
      : `cv_link_button ui_button ui_button_secondary ${className ?? ""}`.trim();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
  }

  return (
    <a
      href={PROFILE.cvPublicPath}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
      download
      onClick={handleClick}
      {...props}
    >
      {variant === "icon" ? <ReadCv /> : label}
    </a>
  );
}

export default CvLink;
