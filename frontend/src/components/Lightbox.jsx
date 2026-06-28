import React, { useEffect, useCallback } from "react";

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];

  const handleKey = useCallback((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!img) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
        <button className="lb-prev" onClick={onPrev} aria-label="Previous">‹</button>
        <button className="lb-next" onClick={onNext} aria-label="Next">›</button>
        <img src={img.src.replace("w=600", "w=1200")} alt={img.title} className="lb-image" />
        <div className="lb-meta">
          <span className="lb-category">{img.category}</span>
          <h3 className="lb-title">{img.title}</h3>
          <p className="lb-location">📍 {img.location}</p>
        </div>
        <div className="lb-counter">{index + 1} / {images.length}</div>
      </div>
    </div>
  );
}
