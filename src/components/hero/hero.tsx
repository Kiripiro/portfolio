import { useEffect, useRef } from "react";
import "../../styles/hero.scss";
import CvLink from "../shared/cvLink";

function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const canvas = cv;

    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    let raf = 0;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const buildLines = () => {
      const H = canvas.height;
      return Array.from({ length: 9 }, (_, i) => ({
        y: H * 0.08 + i * ((H * 0.88) / 8),
        speed: 0.00007 + i * 0.000012,
        amp: 2.5 + i * 1.2,
        freq: 0.0058 - i * 0.0003,
        phase: i * 0.85,
        alpha: i < 3 ? 0 : 0.03 + (i - 3) * 0.016,
      }));
    };

    let lines = buildLines();
    const onResize = () => {
      lines = buildLines();
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    function frame(ts: number) {
      t = ts;
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (const l of lines) {
        if (l.alpha < 0.004) continue;
        context.beginPath();
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = l.y + l.amp * Math.sin(x * l.freq + t * l.speed + l.phase);
          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
        context.strokeStyle = `rgba(252, 214, 64, ${l.alpha})`;
        context.lineWidth = 1.1;
        context.stroke();
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <section className="hero_section">
        <canvas ref={canvasRef} className="hero_canvas" aria-hidden="true" />

        <div className="hero">
          <div className="hero_content">
            <div className="hero_primary_wrap">
              <div className="hero_primary">
                <p className="hero_kicker">
                  SOFTWARE ENGINEER · FULL-STACK EXECUTION
                </p>
                <h1 className="hero_text">
                  <span>From idea</span>
                  <span>to reliable</span>
                  <span>
                    digital <span className="hero_text_accent">products.</span>
                  </span>
                </h1>
              </div>
            </div>

            <div className="hero_bottom">
              <div className="hero_bottom_left">
                <p className="hero_lead">
                  Based in Lyon, I turn requirements into reliable product
                  features, from technical choices to testing and observability.
                </p>
                <div className="hero_actions">
                  <a
                    href="#projects"
                    className="hero_action ui_button ui_button_primary"
                  >
                    View Projects
                  </a>
                  <CvLink className="hero_action hero_action_cv" />
                  <a
                    href="#contact"
                    className="hero_action ui_button ui_button_secondary"
                  >
                    Let's Talk
                  </a>
                </div>
              </div>

              <div className="hero_bottom_right">
                <ul className="hero_skills" aria-label="Core expertise">
                  <li className="hero_skill hero_skill--hi">
                    Feature Ownership, End to End
                  </li>
                  <li className="hero_skill hero_skill--hi">
                    Backend, Frontend & API Design
                  </li>
                  <li className="hero_skill">
                    Architecture · Testing · Observability
                  </li>
                  <li className="hero_skill">AI & Automation in Practice</li>
                </ul>
                <p className="hero_avail">
                  <span className="hero_avail_dot" aria-hidden="true" />
                  Available · Remote / Lyon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
