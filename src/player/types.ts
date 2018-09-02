export type PlaylistTracks = Map<string, ITrack>;

export interface IPlaylistStore {
  playlist: PlaylistTracks;
  selectedTrack: ITrack | undefined;
  isShuffled: boolean;

  addTrack(trackId: string): void;
  removeTrack(trackId: string): void;
  selectTrack(trackId: string): void;
  selectNext(currentId: string): string;
  selectPrev(currentId: string): string;
  toggleShuffle(): void;
}

export interface IPlayerStore {
  state: PlayerState;
  volumePercent: number;
  isMuted: boolean;
  positionPercent: number;

  play(id: string): void;
  pause(id: string): void;
  next(currentId: string): void;
  prev(currentId: string): void;
  seekToPosition(positionMs: number): void;
  setVolume(volumePercent: number): void;
  toggleMute(): void;
}

export type StateChangeCallback = (state: PlayerState) => void;

export interface IPlayerService {
  // trackState$: Observable<{id: string, state: string}>;
  subscribeOnPlayerStateChange(cb: StateChangeCallback): void;
  fetchTrackData(id: string): Promise<ITrack>;
  play(trackId: string, volume: number): void;
  pause(trackId: string): void;
  setVolume(volume: number): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  getCurrentTime(): number;
}

export interface IStorageService {
  loadState(): PlaylistTracks;
  saveState(state: PlaylistTracks): void;
}

export interface ITrack {
  id: string;
  name: string;
  durationMs: number;
  thumbnail: string;
}

export enum StorageKey {
  Playlist = 'playlist',
}

export enum PlayerState {
  Unstarted,
  Ended,
  Playing,
  Paused,
  Buffering,
}
