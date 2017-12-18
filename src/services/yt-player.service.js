import Rx from 'rxjs/Rx';

/**
 * Main YouTube player object for playing song
 * @type {Object}
 */
let player = null;
/**
 * YouTube player object for load new video's info
 * Main 'player' object not used in order to not interrupt currently playing song
 * @type {Object}
 */
let playerSecondary = null;

/**
 * Load video player
 * @param videoId
 * @param container
 * @return {Object}
 */
function loadVideoPlayer(videoId, container) {
    if (!window.YT.loaded) {
        return;
    }
    const ytPlayer = new window.YT.Player(container, {
        // height: '1',
        // width: '1',
        videoId: videoId
    });
    // YT player object doesnt have removeEventListener method
    // Observable.fromEvent will fail if not add one
    ytPlayer.removeEventListener = () => {
    };

    const ytPlayerOnReady$ = Rx.Observable.fromEvent(ytPlayer, 'onReady').take(1);
    const ytPlayerStateChange$ = Rx.Observable.fromEvent(ytPlayer, 'onStateChange');

    return {ytPlayer, ytPlayerOnReady$, ytPlayerStateChange$};
}

/**
 * @public
 * Play/pause video if player with current videoId loaded, or load new player if not
 * @param {string} videoId
 */
export function playOrPauseVideo(videoId) {
    if (player) {
        if (player.getVideoData().video_id === videoId) {
            (player.getPlayerState() === window.YT.PlayerState.PLAYING) ?
                player.pauseVideo() : player.playVideo();
            return {
                ytPlayerOnReady$: Rx.Observable.empty(),
                ytPlayerStateChange$: Rx.Observable.fromEvent(player, 'onStateChange')
            }
        } else {
            player.destroy();
        }
    }
    // Player with videoId not loaded, so load it and return observables
    const {ytPlayer, ytPlayerOnReady$, ytPlayerStateChange$} = loadVideoPlayer(
        videoId,
        'yt-player-container-for-playing-video',
    );
    player = ytPlayer;
    return {ytPlayerOnReady$, ytPlayerStateChange$};
}

/**
 * @public
 * Seek to seconds
 * @param {string} videoId
 * @param {number} seconds
 */
export function seekVideoToSeconds(videoId, seconds) {
    if (player && player.getVideoData().video_id === videoId) {
        player.seekTo(seconds, true);
    } else {
        throw new Error(`Failed to seekTo on vid#${videoId},
        actually loaded vid#${player.getVideoData().video_id}`);
    }
}

/**
 * @public
 * Load new secondary player for getting video info
 * @param {string} videoId
 */
export function getVideoInfoPlayerStream(videoId) {
    if (playerSecondary) {
        playerSecondary.destroy();
    }

    const playerLoadingResult = loadVideoPlayer(
        videoId,
        'yt-player-container-for-loading-video',
    );
    playerSecondary = playerLoadingResult.ytPlayer;

    return playerLoadingResult;
}
