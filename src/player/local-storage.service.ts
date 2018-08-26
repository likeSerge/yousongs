import { IStorageService, StorageKey, PlaylistTracks } from './types';

export class LocalStorageService implements IStorageService {
  private readonly key: StorageKey = StorageKey.Playlist;

  loadState(): PlaylistTracks {
    try {
      const serializedState = window.localStorage.getItem(this.key);
      if (serializedState === null) {
        return new Map();
      }
      return new Map(JSON.parse(serializedState));
    } catch (err) {
      console.warn(`Local storage load data with key:${this.key} error:${err}`);
      return new Map();
    }
  }

  saveState(state: PlaylistTracks): void {
    try {
      const serializedState = JSON.stringify([...state]);
      window.localStorage.setItem(this.key, serializedState);
    } catch (err) {
      console.warn(`Local storage save data with key:${this.key} error:${err}`);
    }
  }
}
