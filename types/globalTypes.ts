export interface VideoData {
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
}

export interface CurrentVideoContext {
  playingVideo?: VideoData;
  setPlayingVideo: (data: VideoData) => void;
}
