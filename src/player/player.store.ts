import { IPlayerService, IPlayerStore, IPlaylistStore, PlayerState } from './types';
import { tempDependencyManager } from './temp-dependency-manager';
import { action, observable } from 'mobx';

export class PlayerStore implements IPlayerStore {
  private readonly playlistStore: IPlaylistStore;
  private readonly playerService: IPlayerService;
  private positionAdjustmentInterval: number;

  constructor() {
    this.playlistStore = tempDependencyManager.getPlaylistStore();
    this.playerService = tempDependencyManager.getPlayerService();
    this.playerService.subscribeOnPlayerStateChange((state: PlayerState) => {
      this.state = state;
      this.adjustPosition();
      this.playNextOnCurrentEnded();
    });
  }

  @observable
  state: PlayerState;
  @observable
  volumePercent: number = 50;
  @observable
  positionPercent: number = 0;

  play(id: string): void {
    if (!this.playlistStore.selectedTrack || id !== this.playlistStore.selectedTrack.id) {
      this.playlistStore.selectTrack(id);
      this.resetPosition();
    }
    this.playerService.play(id, this.volumePercent);
  }

  pause(id: string): void {
    this.playerService.pause(id);
  }

  prev(currentId: string): void {
    this.resetPosition();
    const newId = this.playlistStore.selectPrev(currentId);
    this.checkAndPlayNewId(newId);
  }

  next(currentId: string): void {
    this.resetPosition();
    const newId = this.playlistStore.selectNext(currentId);
    this.checkAndPlayNewId(newId);
  }

  @action
  setVolume = (volume: number): void => {
    this.volumePercent = volume;
    this.playerService.setVolume(volume);
  }

  seekToPosition = (positionPercent: number): void => {
    this.clearPositionAdjustmentTimer();
    this.setPosition(positionPercent);
    const positionSeconds = this.playlistStore.selectedTrack!.durationMs /
      1000 * positionPercent / 100;
    this.playerService.seekTo(positionSeconds, true);
  }

  @action
  setPosition(positionPercent: number): void {
    this.positionPercent = positionPercent;
  }

  private adjustPosition(): void {
    this.clearPositionAdjustmentTimer();
    if (this.state === PlayerState.Ended || this.state === PlayerState.Buffering) {
      return;
    }
    this.positionAdjustmentInterval = window.setInterval(
      () => {
        if (this.state === PlayerState.Playing) {
          this.setPosition(this.calculatePositionPercent());
        }
      },
      300,
    );
  }

  private resetPosition(): void {
    this.setPosition(0);
    this.clearPositionAdjustmentTimer();
  }

  private clearPositionAdjustmentTimer(): void {
    if (this.positionAdjustmentInterval) {
      window.clearInterval(this.positionAdjustmentInterval);
    }
  }

  private calculatePositionPercent(): number {
    return this.playerService.getCurrentTime()
      * 1000 // to ms
      / this.playlistStore.selectedTrack!.durationMs
      * 100;
  }

  private playNextOnCurrentEnded(): void {
    if (this.state === PlayerState.Ended) {
      this.play(this.playlistStore.selectNext(this.playlistStore.selectedTrack!.id));
    }
  }

  private checkAndPlayNewId(newId: string): void {
    if (
      this.state === PlayerState.Playing ||
      this.state === PlayerState.Buffering
    ) {
      this.play(newId);
    }
  }
}
