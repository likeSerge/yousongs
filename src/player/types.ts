export interface IPlaylistStore {
  playlist: ITrack[];
  selectedTrack: string;
  volumePercent: number;
  shuffle: boolean;

  addTrack(trackId: string): void;
  removeTrack(trackId: string): void;
  selectTrack(trackId: string): void;
  setVolume(volumePercent: number): void;
  toggleShuffle(): void;
  getNext(): string;
  getPrev(): string;
}

export interface IPlayerStore {
  state: string;

  play(id: string): void;
  pause(id: string): void;
  stop(id: string): void;
  getPosition(id: string): number;
  seekToPosition(id: string, positionMs: number): void;
}

export type TrackChangeCallback = (id: string, state: string) => void;

export interface IPlayerService {
  // trackState$: Observable<{id: string, state: string}>;
  subscribeOnTrackStateChange(cb: TrackChangeCallback): void;
  fetchTrackData(id: string): Promise<ITrack>;
  play(trackId: string): void;
  pause(trackId: string): void;
  setVolume(trackId: string, volume: number): void;
  setPosition(trackId: string, position: number): void;
}

export interface IStorageService {
  loadState(): ITrack[];
  saveState(state: ITrack[]): void;
}

export interface ITrack {
  id: string;
  name: string;
  durationMs: number;
}

export enum StorageKey {
  Playlist = 'playlist',
}

export enum TrackState { // TODO: add all states
  Playing,
  Paused,
}
