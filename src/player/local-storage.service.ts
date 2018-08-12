import { IStorageService, ITrack, StorageKey } from './types';

export class LocalStorageService implements IStorageService {
  private readonly key: StorageKey = StorageKey.Playlist;

  loadState(): ITrack[] {
    try {
      const serializedState = window.localStorage.getItem(this.key);
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.warn(`Local storage load data with key:${this.key} error:${err}`);
      return [];
    }
  }

  saveState(state: ITrack[]): void {
    try {
      const serializedState = JSON.stringify(state);
      window.localStorage.setItem(this.key, serializedState);
    } catch (err) {
      console.warn(`Local storage save data with key:${this.key} error:${err}`);
    }
  }
}
