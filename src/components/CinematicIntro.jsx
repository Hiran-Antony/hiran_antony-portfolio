import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import introVideo from "../assets/videos/intro.mp4";

export default function CinematicIntro({ onComplete }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    // Request fullscreen on mount
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }

    // Lock scroll during intro
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.documentElement.style.overflow = "hidden";

    // Ensure video plays immediately
    video.play().catch(() => {
      // If autoplay blocked, skip intro
      handleTransitionOut();
    });

    // When video ends → start transition out
    video.addEventListener("ended", handleTransitionOut);

    // Failsafe: force transition after 4 seconds
    // in case video event doesn't fire
    const failsafe = setTimeout(handleTransitionOut, 4000);

    function handleTransitionOut() {
      clearTimeout(failsafe);
      
      // Trigger portfolio reveal instantly (no gap/lag)
      if (onComplete) onComplete();

      // Smoothly crossfade the intro overlay to reveal the portfolio
      gsap.to(container, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => setVisible(false)
      });
    }

    return () => {
      clearTimeout(failsafe);
      video.removeEventListener("ended", handleTransitionOut);
      
      // Restore scroll
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";

      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0D0804",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        pointerEvents: "none",
      }}
    >
      <video
        ref={videoRef}
        src={introVideo}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onLoadedData={() => {
          if (videoRef.current) videoRef.current.play();
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          animation: "videoFadeIn 0.2s ease forwards",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes videoFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
