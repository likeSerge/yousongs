import React from 'react';
import { Component } from 'react';
import './navigation-bar.css';

export class NavigationBar extends Component {
    _progress;
    _navigation;

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (isNaN(nextProps.duration)) {
            return;
        }

        const {duration, currentPlayTime} = nextProps;

        this._progress.style['margin-left'] = `${currentPlayTime / duration * 100}%`;
        this._progress.style.animation = 'none';

        if (nextProps.isPlaying && duration - currentPlayTime > 1) {
            this._progress.style.animation = 'KF-NAVIGATION linear forwards';
            this._progress.style.animationDuration = `${duration - currentPlayTime}s`;
        }
    }

    onClick(e) {
        const {id, duration, seekToSeconds} = this.props;
        if (isNaN(duration)) {
            return;
        }

        const seekPositionPx = e.nativeEvent.clientX - this._navigation.getBoundingClientRect().x;
        const secondsToSeek = seekPositionPx / this._navigation.clientWidth * duration;
        seekToSeconds(id, secondsToSeek);
    }

    render() {
        return (
            <div
                ref={(navigation) => {this._navigation = navigation;}}
                className="navigation-bar"
                onClick={this.onClick}
            >
                <div
                    ref={(progress) => {this._progress = progress;}}
                    className="navigation-bar__progress"
                />
            </div>
        );
    }
}