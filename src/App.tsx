import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import Hero from "./components/Hero";
import ProgressChecklist from "./components/ProgressChecklist";
import Projects from "./components/Projects";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { defaultProfile, profile } from "./data/profile";
import { defaultProjects, projectsData } from "./data/projectsData";
import {
  createTripleClickHandler,
  fireConfetti,
  getEasterEggUnlocked,
  getStoredTheme,
  setEasterEggUnlocked,
  setStoredTheme,
} from "./utils/easterEgg";

const themes = [
  { id: "classic", label: "Classic" },
  { id: "neon", label: "Neon" },
  { id: "sunset", label: "Sunset" },
];

const App = () => {
  const [easterEggUnlockedState, setEasterEggUnlockedState] = useState(false);
  const [theme, setTheme] = useState("classic");
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setEasterEggUnlockedState(getEasterEggUnlocked());
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    setStoredTheme(theme);
  }, [theme]);

  const handleUnlock = useCallback(() => {
    setEasterEggUnlockedState(true);
    setEasterEggUnlocked(true);
    if (confettiCanvasRef.current) {
      fireConfetti(confettiCanvasRef.current, 2000);
    }
  }, []);

  const handleTripleClick = useMemo(
    () => createTripleClickHandler(handleUnlock),
    [handleUnlock],
  );

  return (
    <div className="app">
      <canvas
        ref={confettiCanvasRef}
        className="confetti-canvas"
        aria-hidden="true"
      />
      <header className="header">
        <nav>
          <span className="logo">Personal Portfolio</span>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <Hero
          name={profile.name}
          tagline={profile.tagline}
          cta={
            <a className="button primary" href="#contact">
              Build with me
            </a>
          }
        />

        <ProgressChecklist
          name={profile.name}
          tagline={profile.tagline}
          defaultName={defaultProfile.name}
          defaultTagline={defaultProfile.tagline}
          projectsCount={projectsData.length}
          defaultProjectsCount={defaultProjects.length}
          easterEggUnlocked={easterEggUnlockedState}
          badge={<span className="badge">15-min Lab</span>}
        />

        <section className="section" id="about">
          <div className="section-header">
            <h2>About</h2>
            <p>
              I'm a dedicated developer with a strong interest in Web
              Development, Cybersecurity, and Artificial Intelligence. I enjoy
              designing and building modern applications using React and Node.js
              while continuously improving my technical skills. My current focus
              is gaining practical experience through projects, hackathons, and
              continuous learning to become a well-rounded software engineer.
            </p>
          </div>
          <div className="card">
            <p>
              Skills: HTML, CSS, JavaScript, TypeScript, React, Node.js, Git,
              GitHub, Linux, Networking Fundamentals, and Cybersecurity Basics.
              Continuously learning and improving through hands-on projects and
              practical experience.
            </p>
          </div>
        </section>

        <Projects projects={projectsData} />

        <section className="section" id="contact">
          <div className="section-header">
            <h2>Contact</h2>
            <p>Let’s connect! Feel free to reach out via email or GitHub.</p>
          </div>
          <div className="contact-card">
            <p>
              <strong>Email:</strong> belmaz0518@gmail.com
            </p>
            <p>
              <strong>GitHub:</strong> github.com/webbyfan
            </p>
            <button className="button ghost" type="button">
              Copy email
            </button>
          </div>
        </section>

        {easterEggUnlockedState ? (
          <section className="section" id="theme">
            <div className="section-header">
              <h2>Unlocked</h2>
              <p>Pick a skin to personalize your portfolio.</p>
            </div>
            <ThemeSwitcher
              themes={themes}
              activeTheme={theme}
              onThemeChange={setTheme}
            />
          </section>
        ) : null}
      </main>

      <footer className="footer">
        <p>Made for the SCC Code Camp micro-lab.</p>
        <button
          type="button"
          className="secret-dot"
          onClick={handleTripleClick}
          aria-label="Hidden theme unlock"
          title=""
        />
      </footer>
    </div>
  );
};

export default App;
