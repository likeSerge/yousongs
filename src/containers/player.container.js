import { connect } from 'react-redux';
import { Player } from '../components/player/player.component';
import { togglePlaySong, seekToSeconds } from '../store/selectedSong.actions';
import { selectedSongData } from '../store/selectedSong.reducer';

const mapDispatchToProps = {
    togglePlaySong,
    seekToSeconds
};

const mapStateToProps = (state) => ({
    selectedSongData: selectedSongData(state)
});

export const PlayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
