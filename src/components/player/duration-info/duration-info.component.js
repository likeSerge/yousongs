import React, { Component } from 'react';
import { secondsToMinutesAndSeconds } from '../../../services/time.service';

export class DurationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {currentPlayTime: 0};
    }

    updateInfo(props) {
        if (this.intervalId){
            window.clearInterval(this.intervalId);
        }

        this.setState({currentPlayTime: props.currentPlayTime});

        if(props.isPlaying) {
            this.intervalId = window.setInterval(() => {
                this.setState((prevState, curProps) => ({
                    currentPlayTime: ++prevState.currentPlayTime
                }));
            }, 1000)
        }
    }

    componentDidMount() {
        this.updateInfo(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateInfo(nextProps);
    }

    componentWillUnmount() {
        window.clearInterval(this.intervalId);
    }

    render() {
        const {duration} = this.props;
        return (
            <div className="duration-info">
                {secondsToMinutesAndSeconds(Math.round(this.state.currentPlayTime))} /
                {secondsToMinutesAndSeconds(Math.round(duration))}
            </div>
        );
    }

}
