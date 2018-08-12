import { IPlayerService, IPlayerStore, IPlaylistStore } from './types';
import { tempDependencyManager } from './temp-dependency-manager';

export class PlayerStore implements IPlayerStore {
  private readonly playlistStore: IPlaylistStore;
  private readonly playerService: IPlayerService;

  constructor() {
    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.playerService = tempDependencyManager.getPlayerService();
  }

  state: string;

  play(id: string): void {
    console.log(`***DEBUG*** 'player store play' :`);
    this.playerService.play(id);
  }

  pause(id: string): void {
    console.log(`***DEBUG*** 'player store pause' :`);
    this.playerService.pause(id);
  }

  stop(id: string): void {
    console.log(`***DEBUG*** 'player store stop' :`);
  }

  getPosition(id: string): number {
    console.log(`***DEBUG*** 'player store get position' :`);
    return 0;
  }

  seekToPosition(id: string, positionMs: number): void {
    console.log(`***DEBUG*** 'player store seekToPosition' :`);
  }
}
