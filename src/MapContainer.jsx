import React, { Component } from 'react';

import Map from './Map';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        console.log("MapContainer constructor");
    }

    componentDidMount() {
        console.log('MapContainer componentDidMount');
    }
    
    componentDidUpdate() {
        console.log('MapContainer componentDidUpdate');
    }
    
    static getDerivedStateFromProps(props, state) {
        console.log('MapContainer getDerivedStateFromProps');
        console.dir(props);
        console.dir(state);
        return props;
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('MapContainer getSnapshotBeforeUpdate');
        console.dir(prevProps);
        console.dir(prevState);
        return prevState;
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log('MapContainer shouldComponentUpdate');
        console.dir(nextProps);
        console.dir(nextState);
        console.log(`should MapContainer update: ${nextProps.coords.lat !== this.props.coords.lat && nextProps.coords.lng !== this.props.coords.lng}`);
        return (nextProps.coords.lat !== this.props.coords.lat && nextProps.coords.lng !== this.props.coords.lng);
    }
    
    componentWillUnmount() {
        console.log('MapContainer componentWillUnmount');
    }
    render() { 
        console.log(`Props being passed to Map are: ${this.props.coords.lat}, ${this.props.coords.lng}`);
        return (
            <div className="map-overlay">
                <div id="map">
                    <Map 
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `350px` }} />}
                    mapElement={<div style={{ height: `100%`, maxWidth: `500px`, margin: `auto 0` }} />}
                    coords={this.props.coords}
                    />
                </div>
            </div>
        );
    }
}

export default MapContainer;