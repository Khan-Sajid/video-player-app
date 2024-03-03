import { LegacyRef } from "react";

export interface PlayerType {
  className?: string;
  videoURL: string;
  poster?: string;
  videoType?: string;
  ref?: LegacyRef<HTMLVideoElement>;
  id?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  playbackRate?: number;
  onLoadStart?: () => void;
  onPlay?: () => void;
}
