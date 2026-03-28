import "../../styles/certifications.scss";
import SectionIntro from "../shared/sectionIntro";

const certifications = [
  {
    title: "RNCP Level 7 - Expert in Computer Architecture",
    issuer: "42 School",
    detail: "Verified badge on Credly",
    summary:
      "EU-recognized level 7 certification (master equivalent) focused on data architecture, technical specification design, project coordination, process improvement, and production launch supervision.",
    link: "https://www.credly.com/badges/d1980401-c0b8-4610-8f63-be03bda9ecd9/public_url",
  },
  {
    title: "RNCP Level 6 - Computer Architecture",
    issuer: "42 School",
    detail: "Verified badge on Credly",
    summary:
      "EU-recognized level 6 certification (bachelor equivalent) covering web/mobile application development, requirement analysis, testing and code correction, deployment, and application maintenance.",
    link: "https://www.credly.com/badges/d811cf64-fb93-44dc-89f2-cf3595f25aa9/public_url",
  },
  {
    title: "IBM AI Engineering Specialization",
    issuer: "Coursera",
    detail: "Certificate completed on Coursera",
    summary:
      "Covers machine learning and deep learning workflows: supervised/unsupervised models, Spark pipelines, and practical implementation with Scikit-learn, Keras, PyTorch, and TensorFlow.",
    link: "https://www.coursera.org/account/accomplishments/specialization/LCBSMW299C72",
  },
];

function Certifications() {
  return (
    <section id="certifications" className="certifications_section">
      <div className="certifications_container">
        <SectionIntro
          eyebrow="Certifications"
          title="Validated Credentials"
          subtitle="Independent credentials from Credly and Coursera."
          className="certifications_section_intro"
        />

        <div className="certifications_grid">
          {certifications.map((certification) => (
            <a
              className="cert_card certifications-active"
              key={certification.title}
              href={certification.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-certification="true"
              aria-label={`Open ${certification.title}`}
            >
              <p className="cert_issuer">{certification.issuer}</p>
              <h3>{certification.title}</h3>
              <p className="cert_detail">{certification.detail}</p>
              <p className="cert_summary">{certification.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
