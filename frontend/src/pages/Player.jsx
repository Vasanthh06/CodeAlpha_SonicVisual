import React, { useRef } from "react";
import { usePlayer } from "../context/PlayerContext";

function formatTime(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function EqBars({ active }) {
  return (
    <span className={`eq-bars${active ? " playing" : ""}`}>
      <span /><span /><span /><span />
    </span>
  );
}

export default function Player() {
  const {
    tracks, currentTrack, currentIndex,
    isPlaying, toggle, next, prev,
    shuffle, setShuffle, repeat, setRepeat,
    volume, setVolume, muted, setMuted,
    currentTime, duration, seek, play, addTrack,
  } = usePlayer();

  const fileRef = useRef();

  const handleUpload = (e) => {
    Array.from(e.target.files).forEach(addTrack);
    e.target.value = "";
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <main className="player-page">
      <div className="player-layout">
        {/* Left — Now Playing */}
        <section className="now-playing">
          <div className="vinyl-wrapper">
            <div className={`vinyl-spin${isPlaying ? " spinning" : ""}`}>
              <div className="vinyl-disc">
                <div className="vinyl-label" style={{ background: currentTrack?.color || "#f59e0b" }}>
                  <span>S&amp;V</span>
                </div>
              </div>
            </div>
          </div>

          <div className="track-info">
            <p className="track-artist">{currentTrack?.artist}</p>
            <h2 className="track-name">{currentTrack?.title}</h2>
          </div>

          {/* Progress */}
          <div className="progress-area">
            <input
              type="range" min="0" max={duration || 1} step="0.1"
              value={currentTime}
              onChange={e => seek(Number(e.target.value))}
              className="progress-slider"
              style={{ "--pct": `${progress}%` }}
            />
            <div className="progress-times">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="controls">
            <button
              className={`ctrl-btn ctrl-icon${shuffle ? " active" : ""}`}
              onClick={() => setShuffle(s => !s)} title="Shuffle"
            >⇄</button>
            <button className="ctrl-btn ctrl-nav" onClick={prev} title="Previous">⏮</button>
            <button className="ctrl-btn ctrl-play" onClick={toggle} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="ctrl-btn ctrl-nav" onClick={next} title="Next">⏭</button>
            <button
              className={`ctrl-btn ctrl-icon${repeat ? " active" : ""}`}
              onClick={() => setRepeat(r => !r)} title="Repeat"
            >↻</button>
          </div>

          {/* Volume */}
          <div className="volume-row">
            <button className="mute-btn" onClick={() => setMuted(m => !m)}>
              {muted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
            </button>
            <input
              type="range" min="0" max="1" step="0.01"
              value={muted ? 0 : volume}
              onChange={e => { setVolume(Number(e.target.value)); setMuted(false); }}
              className="volume-slider"
              style={{ "--pct": `${(muted ? 0 : volume) * 100}%` }}
            />
          </div>
        </section>

        {/* Right — Queue */}
        <section className="queue">
          <div className="queue-header">
            <h3>Queue</h3>
            <button className="upload-btn" onClick={() => fileRef.current?.click()}>
              + Upload MP3
            </button>
            <input ref={fileRef} type="file" accept="audio/*" multiple hidden onChange={handleUpload} />
          </div>
          <ul className="track-list">
            {tracks.map((t, i) => (
              <li
                key={t.id}
                className={`track-row${i === currentIndex ? " current" : ""}`}
                onClick={() => play(i)}
              >
                <div className="track-row-left">
                  <span className="track-num">
                    {i === currentIndex
                      ? <EqBars active={isPlaying} />
                      : <span className="track-idx">{i + 1}</span>
                    }
                  </span>
                  <div>
                    <p className="track-row-title">{t.title}</p>
                    <p className="track-row-artist">{t.artist}</p>
                  </div>
                </div>
                <div className="track-row-right">
                  <span className="track-dot" style={{ background: t.color }} />
                  <span className="track-dur">{t.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
