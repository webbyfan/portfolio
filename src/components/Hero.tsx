import type { ReactNode } from "react";

type HeroProps = {
  name: string;
  tagline: string;
  cta?: ReactNode;
};

const Hero = ({ name, tagline, cta }: HeroProps) => {
  return (
    <section className="hero" id="home">
      <div className="hero-card">
        <p className="eyebrow">Computer Science Student</p>
        <h1>{name}</h1>
        <p className="tagline">{tagline}</p>
        <div className="hero-actions">{cta}</div>
      </div>
    </section>
  );
};

export default Hero;
