import { IPlayerService, ITrack, PlayerState, StateChangeCallback } from './types';

enum DivForYotubeIframeId {
  PlayingSong = 'youtube-div-for-playing-song',
  GettingSongData = 'youtube-div-for-getting-song-data',
}

const YOUTUBE_API_SCRIPT_SRC = 'https://www.youtube.com/iframe_api';
const UNTYPED_WINDOW = window as any;

export class YtPlayerService implements IPlayerService {
  private playerForGettingSongData: any = undefined;
  private playerForPlayingSong: any = undefined;
  private stateChangeListeners: StateChangeCallback[] = [];

  constructor() {
    YtPlayerService.prepareYoutubeService();
  }

  fetchTrackData(id: string): Promise<ITrack> {
    const videoId = YtPlayerService.getVideoIdFromLink(id);
    if (this.playerForGettingSongData) {
      this.playerForGettingSongData.destroy();
    }

    // TODO: handle reject(broken id or API error)
    return new Promise((resolve, reject) => {
      const onPlayerReady = (): void => {
        resolve({
          id: videoId,
          name: this.playerForGettingSongData.getVideoData().title,
          durationMs: this.playerForGettingSongData.getDuration() * 1000,
          thumbnail: `http://img.youtube.com/vi/${videoId}/0.jpg`,
        });
      };

      // https://www.youtube.com/watch?v=63rd119fmQ4
      // TODO: untypedWindow.onYouTubeIframeAPIReady = () => {
      this.playerForGettingSongData =
        YtPlayerService.createPlayerAndGetData(videoId, onPlayerReady);
    });
  }

  play(videoId: string, volume: number): void {
    if (YtPlayerService.isVideoLoadedToPlayer(videoId, this.playerForPlayingSong)) {
      this.playerForPlayingSong.playVideo();
    } else {
      if (this.playerForPlayingSong) {
        this.playerForPlayingSong.destroy();
      }
      this.playerForPlayingSong = this.createPlayerAndStartPlaying(videoId, volume);
    }
  }

  pause(trackId: string): void {
    if (this.playerForPlayingSong) {
      this.playerForPlayingSong.pauseVideo();
    }
  }

  setVolume(volume: number): void {
    if (this.playerForPlayingSong) {
      this.playerForPlayingSong.setVolume(volume);
    }
  }

  seekTo(positionSeconds: number, allowSeekAhead: boolean = false): void {
    this.playerForPlayingSong.seekTo(positionSeconds, allowSeekAhead);
  }

  subscribeOnPlayerStateChange(cb: StateChangeCallback): void {
    this.stateChangeListeners.push(cb);
  }

  getCurrentTime(): number {
    return this.playerForPlayingSong.getCurrentTime();
  }

  private static prepareYoutubeService(): void {
    YtPlayerService.addYoutubeScript();
    YtPlayerService.addDivWithId(DivForYotubeIframeId.PlayingSong);
    YtPlayerService.addDivWithId(DivForYotubeIframeId.GettingSongData);
  }

  private static addYoutubeScript(): void {
    const youtubeScriptTag = document.createElement('script');
    youtubeScriptTag.src = YOUTUBE_API_SCRIPT_SRC;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag!.parentNode!.insertBefore(youtubeScriptTag, firstScriptTag);
  }

  private static addDivWithId(divId: DivForYotubeIframeId): void {
    const newDiv = document.createElement('div');
    newDiv.id = divId;
    document.body.appendChild(newDiv);
  }

  private static getVideoIdFromLink(link: string): string {
    const videoIdLinkPart = link.split('?v=')[1];
    return videoIdLinkPart
      ? videoIdLinkPart.split('&')[0]
      : link;
  }

  private static isVideoLoadedToPlayer(videoId: string, player: any): boolean {
    // Player can be defined, but not usable(on quick 'next clicks')
    return !!player && !!player.getVideoData && player.getVideoData().video_id === videoId;
  }

  private createPlayerAndStartPlaying(id: string, volume: number): any {
    // playerForPlayingSong variable needed for onReady callback
    const playerForPlayingSong = new UNTYPED_WINDOW.YT.Player(
      DivForYotubeIframeId.PlayingSong,
      {
        videoId: id,
        height: '0',
        width: '0',
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: () => {
            playerForPlayingSong.playVideo();
            this.setVolume(volume);
          },
          onStateChange: this.onPlayerStateChange,
        },
      });

    return playerForPlayingSong;
  }

  private onPlayerStateChange = (event: any): void => {
    this.stateChangeListeners.map(
      listener => listener(YtPlayerService.ytPlayerStateToPlayerState(event.data)),
    );
  }

  /**
  -1 – unstarted
   0 – ended
   1 – playing
   2 – paused
   3 – buffering
   5 – video cued
   */
  private static ytPlayerStateToPlayerState(state: number): PlayerState {
    switch (state) {
      case -1:
      case 5:
        return PlayerState.Unstarted;
      case 0:
        return PlayerState.Ended;
      case 1:
        return PlayerState.Playing;
      case 2:
        return PlayerState.Paused;
      case 3:
        return PlayerState.Buffering;
      default:
        return PlayerState.Unstarted;
    }
  }

  private static createPlayerAndGetData(id: string, cb: Function): any {
    return new UNTYPED_WINDOW.YT.Player(
      DivForYotubeIframeId.GettingSongData,
      {
        videoId: id,
        height: '0',
        width: '0',
        events: {
          onReady: cb,
        },
      });
  }
}
