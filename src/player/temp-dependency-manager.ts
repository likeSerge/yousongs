// TODO: temporary class

import { IPlayerService, IPlayerStore, IPlaylistStore, IStorageService } from './types';
import { LocalStorageService } from './local-storage.service';
import { YtPlayerService } from './yt-player.service';
import { PlayerStore } from './player.store';
import { PlaylistStore } from './playlist.store';

let playerStore: IPlayerStore;
let playlistStore: IPlaylistStore;
let storageService: IStorageService;
let playerService: IPlayerService;

export const tempDependencyManager = {
  getPlaylistStore(): IPlaylistStore {
    if (!playerStore) {
      playlistStore = new PlaylistStore();
    }
    return playlistStore;
  },
  getPlayerStore(): IPlayerStore {
    if (!playerStore) {
      playerStore = new PlayerStore();
    }
    return playerStore;
  },
  getStorageService(): IStorageService {
    if (!storageService) {
      storageService = new LocalStorageService();
    }
    return storageService;
  },
  getPlayerService(): IPlayerService {
    if (!playerService) {
      playerService = new YtPlayerService();
    }
    return playerService;
  },
};

