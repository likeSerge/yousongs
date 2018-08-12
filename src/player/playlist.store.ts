import { IPlayerService, IPlaylistStore, IStorageService, ITrack } from './types';
import { tempDependencyManager } from './temp-dependency-manager';

export class PlaylistStore implements IPlaylistStore {
  private readonly playerService: IPlayerService;
  private readonly storageService: IStorageService;

  constructor() {
    this.playerService = tempDependencyManager.getPlayerService();
    this.storageService = tempDependencyManager.getStorageService();

    this.loadPlaylistOnStart();
    this.subscribeToSavePlaylistBeforeUnload();
  }

  playlist: ITrack[] = [];
  selectedTrack: string = '';
  volumePercent: number = 50;
  currentTrack: ITrack;
  shuffle: boolean;

  addTrack(id: string): void {
    this.playerService.fetchTrackData(id)
      .then((track) => {
        this.playlist.push(track);
      });
    console.log(`add track with id: ${id}`);
  }

  removeTrack(id: string): void {
    console.log(`remove track with id: ${id}`);
    const indexToRemove = this.playlist.findIndex(listItem => listItem.id === id);
    if (indexToRemove === -1) {
      return;
    }
    this.playlist = [
      ...this.playlist.slice(0, indexToRemove),
      ...this.playlist.slice(indexToRemove + 1),
    ];
  }

  selectTrack(id: string): void {
    console.log(`select track with id: ${id}`);
    this.selectedTrack = id;
  }

  setVolume(volume: number) {
    alert(`set volume to ${volume}`);
  }

  getNext(): string {
    alert('play next');
    return '';
  }

  getPrev(): string {
    alert('play prev');
    return '';
  }

  toggleShuffle(): void {
    alert('toggle shuffle');
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
}
