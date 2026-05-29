"use client";

import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  src: string;
}

export default function VideoModal({ src }: VideoModalProps) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function handleOpen() {
    setOpen(true);
    setPlaying(false);
    setProgress(0);
  }

  function handleClose() {
    setOpen(false);
    videoRef.current?.pause();
    setPlaying(false);
  }

  function togglePlay() {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying((prev) => !prev);
  }

  function handleTimeUpdate() {
    if (!videoRef.current) return;
    setProgress(videoRef.current.currentTime);
  }

  function handleLoadedMetadata() {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if (!videoRef.current) return;
    const val = Number(e.target.value);
    videoRef.current.currentTime = val;
    setProgress(val);
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <>
      {/* Trigger button — drop this wherever your VIEW DEMO button is */}
      <button
        onClick={handleOpen}
        className="cursor-pointer hover:text-[#949592] transition-colors"
      >
        VIEW DEMO
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-lg flex items-center justify-center px-4"
          onClick={handleClose}
        >
          {/* Modal */}
          <div
            className="relative animate-scale-in w-full max-w-3xl border-[3px] border-[#f5f5f535] bg-[#191A1A] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute cursor-pointer top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-neutral-400 hover:text-white"
            >
              ✕
            </button>

            {/* Video */}
            <video
              ref={videoRef}
              src={src}
              className="w-full aspect-video object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
            />

            {/* Controls */}
            <div className="px-5 py-4 flex flex-col gap-3">
              {/* Seekbar */}
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.01}
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 appearance-none rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ffffff ${(progress / (duration || 1)) * 100}%, #2a2a2a ${(progress / (duration || 1)) * 100}%)`,
                }}
              />

              {/* Play/Pause + Time */}
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-white hover:bg-neutral-200 transition-colors"
                >
                  {playing ? (
                    // Pause icon
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#090909"
                    >
                      <rect x="5" y="3" width="4" height="18" rx="1" />
                      <rect x="15" y="3" width="4" height="18" rx="1" />
                    </svg>
                  ) : (
                    // Play icon
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#090909"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  )}
                </button>

                <span className="text-xs text-neutral-500 font-mono">
                  {formatTime(progress)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
