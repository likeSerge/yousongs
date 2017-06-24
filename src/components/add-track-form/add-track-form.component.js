import React, { Component } from 'react';
import './add-track-form.css';

/**
 * Form for adding tracks to playlist by pasting youtube video url
 */
export class AddTrackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.addPlaylistItem = props.addPlaylistItem;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const videoId = this.state.value.split('?v=')[1].split('&')[0];
        if (!videoId) {
            this.setState({value: 'paste valid youtube url!'});
            return;
        }
        this.setState({value: ''});
        this.addPlaylistItem(videoId);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="add-track-form">
                <label>
                    Link to youtube video:
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Add track"/>
            </form>
        );
    }
}
