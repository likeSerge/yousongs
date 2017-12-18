import { Playlist } from '../components/playlist/playlist.component';
import { togglePlaySong } from '../store/selectedSong.actions';
import { removePlaylistItem } from '../store/playlist.actions';
import { connect } from 'react-redux';

const mapDispatchToProps = {
    togglePlaySong,
    removePlaylistItem
};

const mapStateToProps = (state) => ({
    playlist: state.playlist,
    selectedSong: state.selectedSong
});

export const PlaylistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist);
