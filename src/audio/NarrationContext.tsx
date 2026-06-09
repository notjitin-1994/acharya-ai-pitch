import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface NarrationContextValue {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  toggle: () => void;
  seek: (time: number) => void;
  pauseForVideo: () => void;
  resumeFromVideo: () => void;
}

const NarrationContext = createContext<NarrationContextValue | null>(null);

export function NarrationProvider({ children }: { children: React.ReactNode }) {
  // Single audio element for the app's entire lifetime — never recreated.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  if (!audioRef.current) {
    audioRef.current = new Audio('/audio/narration.mp3');
    audioRef.current.preload = 'auto';
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Tracks whether the user explicitly pressed pause (vs externally paused by video).
  const userPausedRef = useRef(false);
  // Tracks whether narration was playing when an external pause was requested.
  const wasPlayingBeforeVideoRef = useRef(false);
  // Tracks whether we're currently in an external (video) pause — used by the
  // gesture autoplay listener so it doesn't fight the video.
  const isExternallyPausedRef = useRef(false);

  // Wire up audio event listeners once. These stay alive for the app's lifetime.
  useEffect(() => {
    const el = audioRef.current!;

    const onLoaded = () => setDuration(el.duration);
    const onTime = () => setCurrentTime(el.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      el.currentTime = 0;
      setCurrentTime(0);
    };

    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnded);

    if (!isNaN(el.duration)) setDuration(el.duration);
    setCurrentTime(el.currentTime);
    setIsPlaying(!el.paused);

    // Optimistic autoplay — browsers usually block this for un-interacted pages,
    // but costs nothing when it succeeds.
    el.play().catch(() => {});

    // Gesture unlock: the first user interaction unlocks audio autoplay.
    // Checks both userPaused and externally-paused before attempting play.
    const tryPlay = () => {
      if (el.paused && !userPausedRef.current && !isExternallyPausedRef.current) {
        el.play().catch(() => {});
      }
    };
    const passive: AddEventListenerOptions = { passive: true };
    document.addEventListener('click', tryPlay, passive);
    document.addEventListener('scroll', tryPlay, passive);
    document.addEventListener('keydown', tryPlay);
    document.addEventListener('touchstart', tryPlay, passive);
    document.addEventListener('pointerdown', tryPlay, passive);

    return () => {
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnded);
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('scroll', tryPlay);
      document.removeEventListener('keydown', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('pointerdown', tryPlay);
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current!;
    if (!el.paused) {
      el.pause();
      userPausedRef.current = true;
    } else {
      userPausedRef.current = false;
      el.play().catch(() => {});
    }
  };

  const seek = (time: number) => {
    const el = audioRef.current!;
    el.currentTime = Math.max(0, Math.min(time, isFinite(el.duration) ? el.duration : 0));
  };

  // Called when the video dialog opens. Remembers whether narration was playing
  // so resumeFromVideo can restore the right state.
  const pauseForVideo = () => {
    const el = audioRef.current!;
    wasPlayingBeforeVideoRef.current = !el.paused;
    isExternallyPausedRef.current = true;
    if (!el.paused) el.pause();
  };

  // Called when the video dialog closes. Resumes only if narration was playing
  // before the video opened and the user hasn't manually paused since.
  const resumeFromVideo = () => {
    isExternallyPausedRef.current = false;
    if (wasPlayingBeforeVideoRef.current && !userPausedRef.current) {
      audioRef.current!.play().catch(() => {});
    }
    wasPlayingBeforeVideoRef.current = false;
  };

  return (
    <NarrationContext.Provider
      value={{ isPlaying, currentTime, duration, toggle, seek, pauseForVideo, resumeFromVideo }}
    >
      {children}
    </NarrationContext.Provider>
  );
}

export function useNarration(): NarrationContextValue {
  const ctx = useContext(NarrationContext);
  if (!ctx) throw new Error('useNarration must be used inside <NarrationProvider>');
  return ctx;
}
