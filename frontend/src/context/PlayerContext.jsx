import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import { tracks as defaultTracks } from "../data/tracks";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [tracks, setTracks] = useState(defaultTracks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setCurrentTime(audio.currentTime);
    const loaded = () => setDuration(audio.duration || 0);
    const ended = () => {
      if (repeat) { audio.currentTime = 0; audio.play(); }
      else next();
    };
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", loaded);
    audio.addEventListener("ended", ended);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", loaded);
      audio.removeEventListener("ended", ended);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeat, currentIndex, tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) audio.play().catch(() => {});
  }, [currentIndex, tracks]);

  const play = (idx) => {
    if (idx !== undefined && idx !== currentIndex) { setCurrentIndex(idx); setIsPlaying(true); return; }
    setIsPlaying(true);
  };
  const pause = () => setIsPlaying(false);
  const toggle = () => setIsPlaying(p => !p);

  const next = useCallback(() => {
    setCurrentIndex(i => {
      if (shuffle) {
        let n; do { n = Math.floor(Math.random() * tracks.length); } while (n === i && tracks.length > 1);
        return n;
      }
      return (i + 1) % tracks.length;
    });
    setIsPlaying(true);
  }, [shuffle, tracks.length]);

  const prev = () => {
    if (currentTime > 3) { audioRef.current.currentTime = 0; return; }
    setCurrentIndex(i => (i - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const seek = (t) => {
    const audio = audioRef.current;
    if (audio) { audio.currentTime = t; setCurrentTime(t); }
  };

  const addTrack = (file) => {
    const url = URL.createObjectURL(file);
    const newTrack = {
      id: Date.now(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "You",
      duration: "--:--",
      src: url,
      color: "#f59e0b",
    };
    setTracks(t => [...t, newTrack]);
  };

  return (
    <PlayerContext.Provider value={{
      tracks, currentTrack, currentIndex, isPlaying,
      shuffle, setShuffle, repeat, setRepeat,
      volume, setVolume, muted, setMuted,
      currentTime, duration,
      play, pause, toggle, next, prev, seek, addTrack,
    }}>
      <audio ref={audioRef} src={currentTrack?.src} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
