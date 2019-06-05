import React, { Component } from 'react';

class CurrentLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("CurrentLocation constructor");
    }

    componentDidMount() {
        console.log('CurrentLocation componentDidMount');
    }

    componentDidUpdate() {
        console.log('CurrentLocation componentDidUpdate');
    }

    static getDerivedStateFromProps(props, state) {
        console.log('CurrentLocation getDerivedStateFromProps');
        console.dir(props);
        console.dir(state);
        return state;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('CurrentLocation getSnapshotBeforeUpdate');
        console.dir(prevProps);
        console.dir(prevState);
        return prevProps;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('CurrentLocation shouldComponentUpdate');
        console.dir(nextProps);
        console.dir(nextState);
        console.log(`should CurrentLocation update: ${nextProps.address !== this.props.address}`);
        return (nextProps.address !== this.props.address);
    }

    componentWillUnmount() {
        console.log('CurrentLocation componentWillUnmount');
    }

    toggleFavourite = () => {
        this.props.onFavouriteToggle(this.props.address);
    }

    render() {
        let favouriteClassName = '';
        if (this.props.address.index !== 'Location not found...') {
            if (this.props.favourite === true) {
                favouriteClassName = `glyphicon glyphicon-star`;
            } else {
                favouriteClassName = `glyphicon glyphicon-star-empty`;
            }
        }
        console.log("CurrentLocation render");
        return (
            <div className="col-xs-12 col-md-6 col-md-offset-3 current-location">
                <h4 id="save-location">{this.props.address}</h4>
                {this.props.address === `Location not found...` ? false : <span
                    className={favouriteClassName}
                    onClick={this.toggleFavourite}
                    aria-hidden="true"
                ></span>}
            </div>
        );
    }
}

export default CurrentLocation;