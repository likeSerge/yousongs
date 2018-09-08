import { IPlayerService, IPlaylistStore, IStorageService, ITrack, PlaylistTracks } from './types';
import { tempDependencyManager } from './temp-dependency-manager';
import { action, observable } from 'mobx';

// TODO: error handling
export class PlaylistStore implements IPlaylistStore {
  private readonly playerService: IPlayerService;
  private readonly storageService: IStorageService;

  constructor() {
    this.playerService = tempDependencyManager.getPlayerService();
    this.storageService = tempDependencyManager.getStorageService();

    this.loadPlaylistOnStart();
    this.subscribeToSavePlaylistBeforeUnload();
  }

  @observable
  playlist: PlaylistTracks = new Map();
  @observable
  selectedTrack: ITrack | undefined;

  // TODO: generate shuffled array once instead of random on next and prev
  @observable
  isShuffled: boolean = false;

  addTrack(id: string): void {
    this.playerService.fetchTrackData(id)
      .then(this.checkAndSetTrack);
  }

  @action
  removeTrack(id: string): void {
    if (!this.playlist.delete(id)) {
      console.warn(`PlaylistStore.removeTrack: no id: ${id} in list`);
    }
  }

  @action
  selectTrack(id: string): void {
    this.selectedTrack = this.playlist.get(id);
  }

  // TODO: getNext and select from playerStore
  selectNext = (currentId: string): string => {
    return this.selectNextOrPrev(currentId, this.getNextTrackId);
  }

  selectPrev(currentId: string): string {
    return this.selectNextOrPrev(currentId, this.getPrevTrackId);
  }

  @action
  toggleShuffle = (): void => {
    this.isShuffled = !this.isShuffled;
  }

  private loadPlaylistOnStart(): void {
    this.playlist = this.storageService.loadState();
  }

  private subscribeToSavePlaylistBeforeUnload(): void {
    // Fires once before page close, no need to unsubscribe
    window.addEventListener('beforeunload', this.savePlaylistBeforeLeavingPage);
  }

  private savePlaylistBeforeLeavingPage = (): void => {
    this.storageService.saveState(this.playlist);
  }

  @action.bound
  private checkAndSetTrack(track: ITrack): void {
    if (!track.id) {
      return;
    }
    this.playlist.set(track.id, track);
  }

  private get trackIds(): string[] {
    return [...this.playlist.keys()];
  }

  private selectNextOrPrev(
    currentTrackId: string,
    getNextOrPrev: (currentTrackIndex: number) => string,
  ): string {
    const currentTrackIndex = this.trackIds.indexOf(currentTrackId);
    const nextTrackId = this.isShuffled
      ? this.getShuffledId(currentTrackIndex)
      : getNextOrPrev(currentTrackIndex);

    this.selectTrack(nextTrackId);

    return nextTrackId;
  }

  private getShuffledId(currentTrackIndex: number): string {
    // The maximum is exclusive and the minimum is inclusive
    const min = 0;
    const max = this.playlist.size; // max index + 1 to exclude 1 number(current)
    const randBeforeExclusion = Math.floor(Math.random() * (max - min)) + min;
    const shuffledIndex = randBeforeExclusion === currentTrackIndex
      ? randBeforeExclusion + 1
      : randBeforeExclusion;
    return shuffledIndex === this.playlist.size
      ? this.trackIds[0]
      : this.trackIds[shuffledIndex];
  }

  private getNextTrackId = (currentTrackIndex: number): string => {
    return (currentTrackIndex === (this.playlist.size - 1))
      ? this.trackIds[0]
      : this.trackIds[currentTrackIndex + 1]; // also '-1' case of indexOf
  }

  private getPrevTrackId = (currentTrackIndex: number): string => {
    return  (currentTrackIndex === 0)
      ? this.trackIds[this.playlist.size - 1]
      : this.trackIds[currentTrackIndex - 1];
  }
}
