# Sonic & Visual

A cinematic dark portfolio combining an interactive **Three.js hero**, a fully featured **music player** (with upload-your-own-tracks), and a **professional image gallery** with category filters and a keyboard-driven lightbox.

Built with React 18, React Three Fiber, and Framer-style micro-interactions.

---

## ✨ Features

**Home** — Three.js scene with a rotating vinyl, floating polaroid frames, mouse-parallax camera, and amber atmospheric sparkles.

**Music Player** (`/player`)
- 8 royalty-free demo tracks
- Upload-your-own MP3s (audio/* file input → blob URL)
- Play / Pause / Next / Previous / Shuffle / Repeat
- Progress scrubber with seek
- Volume slider + mute toggle
- Autoplay-next, click-to-play queue, live equalizer indicator

**Image Gallery** (`/gallery`)
- 20 curated images across 5 categories (Nature, Architecture, Art, Travel, Portrait)
- Masonry grid with `react-parallax-tilt`
- Hover overlay reveals title, category & location
- Cinematic lightbox with keyboard navigation (← / → / Esc)

**Polish**
- Custom typographic system: Oswald + Cormorant Garamond + Outfit
- Noise overlay, glassmorphism nav, marquee strip
- Responsive: mobile-first, no horizontal scroll, accessible focus states

---

## 🚀 Local Development

```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:3000`.

---

## 🌐 GitHub Pages Deploy

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to **GitHub Actions**
4. Push to `main` — your site goes live at `https://<username>.github.io/<repo>/`

---

## 🧩 Project Structure

```
.
├── .github/workflows/deploy.yml
└── frontend/
    ├── public/index.html
    └── src/
        ├── components/   Navbar, ThreeScene, Lightbox
        ├── pages/        Home, Player, Gallery
        ├── context/      PlayerContext.jsx
        └── data/         tracks.js, images.js
```

---

## 📜 Credits

- Audio: SoundHelix (royalty-free samples)
- Imagery: Unsplash contributors
- MIT — fork it, ship it, make it yours.
