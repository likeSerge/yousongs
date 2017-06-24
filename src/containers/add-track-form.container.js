import { connect } from 'react-redux';
import { AddTrackForm } from '../components/add-track-form/add-track-form.component';
import { addPlaylistItem } from '../store/playlist.actions';

const mapDispatchToProps = {
    addPlaylistItem
};

export const AddTrackFormContainer = connect(
    null,
    mapDispatchToProps
)(AddTrackForm);
