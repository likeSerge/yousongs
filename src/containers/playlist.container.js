import { Playlist } from '../components/playlist/playlist.component';
import { togglePlaySong } from '../store/selectedSong.actions';
import { connect } from 'react-redux';

const mapDispatchToProps = {togglePlaySong};

const mapStateToProps = (state) => ({
    playlist: state.playlist,
    selectedSong: state.selectedSong
});

export const PlaylistContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist);
