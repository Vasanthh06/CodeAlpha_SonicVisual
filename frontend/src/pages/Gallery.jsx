import React, { useState, useMemo } from "react";
import Tilt from "react-parallax-tilt";
import Lightbox from "../components/Lightbox";
import { images, categories } from "../data/images";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() =>
    activeCategory === "All" ? images : images.filter(img => img.category === activeCategory),
    [activeCategory]
  );

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
  const nextImage = () => setLightboxIndex(i => (i + 1) % filtered.length);

  return (
    <main className="gallery-page">
      <div className="gallery-header">
        <p className="gallery-eyebrow">Portfolio</p>
        <h1 className="gallery-title">Image Gallery</h1>
        <p className="gallery-sub">20 images across 5 categories</p>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {filtered.map((img, i) => (
          <Tilt
            key={img.id}
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            glareEnable={false}
            className={`masonry-item masonry-${img.height}`}
          >
            <div className="gallery-card" onClick={() => openLightbox(i)}>
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="gallery-overlay">
                <span className="overlay-category">{img.category}</span>
                <h3 className="overlay-title">{img.title}</h3>
                <p className="overlay-location">📍 {img.location}</p>
              </div>
            </div>
          </Tilt>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </main>
  );
}
