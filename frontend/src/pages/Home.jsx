import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const ThreeScene = lazy(() => import("../components/ThreeScene"));

const MARQUEE_ITEMS = ["Music", "Visual", "Craft", "Story", "Sound", "Light", "Frame", "Rhythm"];

export default function Home() {
  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <Suspense fallback={<div className="hero-fallback" />}>
          <ThreeScene />
        </Suspense>

        <div className="hero-content">
          <p className="hero-eyebrow">A cinematic portfolio</p>
          <h1 className="hero-title">
            <span className="hero-title-line">Sonic</span>
            <span className="hero-title-amp">&amp;</span>
            <span className="hero-title-line">Visual</span>
          </h1>
          <p className="hero-sub">
            Where music meets image — an immersive space for sound and light.
          </p>
          <div className="hero-cta">
            <Link to="/player" className="btn btn-primary">Open Player</Link>
            <Link to="/gallery" className="btn btn-outline">View Gallery</Link>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">♪</div>
            <h3 className="feature-title">Music Player</h3>
            <p className="feature-desc">
              8 curated tracks with full playback controls, shuffle, repeat, and upload-your-own support.
            </p>
            <Link to="/player" className="feature-link">Listen now →</Link>
          </div>
          <div className="feature-card feature-card--accent">
            <div className="feature-icon">◉</div>
            <h3 className="feature-title">Image Gallery</h3>
            <p className="feature-desc">
              20 images across 5 categories in a masonry grid with cinematic lightbox and keyboard navigation.
            </p>
            <Link to="/gallery" className="feature-link">Explore →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3 className="feature-title">Immersive 3D</h3>
            <p className="feature-desc">
              Mouse-parallax Three.js scene with a rotating vinyl, floating polaroids, and amber sparkles.
            </p>
            <span className="feature-link">You're in it</span>
          </div>
        </div>
      </section>
    </main>
  );
}
