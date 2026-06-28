import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/player", label: "Player" },
    { to: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <Link to="/" className="nav-logo">S&amp;V</Link>

      <div className={`nav-links${open ? " open" : ""}`}>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link${location.pathname === l.to ? " active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
