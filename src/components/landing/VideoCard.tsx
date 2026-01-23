"use client";

import { useEffect, useRef } from 'react';

interface VideoCardProps {
  src: string;
  poster: string;
  className?: string;
}

export function VideoCard({ src, poster, className }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay was prevented on some browsers.
            // User can tap to play.
          });
        } else {
          video.pause();
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.25, // Start playing when 25% of the video is visible
      }
    );

    observer.observe(video);

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  const handleInteraction = (e: React.MouseEvent<HTMLVideoElement> | React.TouchEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video.play().catch(() => {});
    }
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      onClick={handleInteraction}
      onTouchEnd={handleInteraction}
    />
  );
}
