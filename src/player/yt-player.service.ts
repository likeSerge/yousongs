// import { Promise } from 'es6-promise';
import { IPlayerService, ITrack, TrackChangeCallback } from './types';

enum DivForYotubeIframeId {
  PlayingSong = 'youtube-div-for-playing-song',
  GettingSongData = 'youtube-div-for-getting-song-data',
}

const YOUTUBE_API_SCRIPT_SRC = 'https://www.youtube.com/iframe_api';
const UNTYPED_WINDOW = window as any;

export class YtPlayerService implements IPlayerService {
  private playerForGettingSongData: any = undefined;
  private playerForPlayingSong: any = undefined;

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
        });
      };

      // https://www.youtube.com/watch?v=63rd119fmQ4
      // TODO: untypedWindow.onYouTubeIframeAPIReady = () => {
      this.playerForGettingSongData =
        YtPlayerService.createPlayerAndGetData(videoId, onPlayerReady);
    });
  }

  play(videoId: string): void {
    console.log('YT play');
    if (YtPlayerService.isVideoLoadedToPlayer(videoId, this.playerForPlayingSong)) {
      this.playerForPlayingSong.playVideo();
    } else {
      if (this.playerForPlayingSong) {
        this.playerForPlayingSong.destroy();
      }
      this.playerForPlayingSong = YtPlayerService.createPlayerAndStartPlaying(videoId);
    }
  }

  pause(trackId: string): void {
    console.log('YT pause');
    if (this.playerForPlayingSong) {
      this.playerForPlayingSong.pauseVideo();
    }
  }


  setVolume(trackId: string, volume: number): void {
    alert('YT setVolume');
  }

  setPosition(trackId: string, position: number): void {
    alert('YT setPosition');
  }

  subscribeOnTrackStateChange(cb: TrackChangeCallback): void {
    alert('YT subscribeOnTrackStateChange');
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
    firstScriptTag.parentNode.insertBefore(youtubeScriptTag, firstScriptTag);
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
    return player && player.getVideoData().video_id === videoId;
  }

  private static createPlayerAndStartPlaying(id: string): any {
    // playerForPlayingSong variable needed to pass onReady callback
    const playerForPlayingSong = new UNTYPED_WINDOW.YT.Player(
      DivForYotubeIframeId.PlayingSong,
      {
        videoId: id,
        height: '0',
        width: '0',
        events: {
          onReady: () => playerForPlayingSong.playVideo(),
        },
      });

    return playerForPlayingSong;
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
