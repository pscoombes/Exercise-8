import React, { Component } from 'react';

import CurrentLocation from './CurrentLocation';
import MapContainer from './MapContainer';
import Search from './Search';

let favourites = [];


if (localStorage.favourites) {
	favourites = JSON.parse(localStorage.favourites);
}

class App extends Component {
	constructor(props) {
		super(props);

		console.log('App constructor');

		this.state = {
			favourites,
			currentAddress: 'QA Manchester',
			mapCoordinates: {
				lat: 53.475586,
				lng: -2.241402
			}
		}
		console.dir(this.state);
		this.searchForAddress = this.searchForAddress.bind(this);
	}

	isAddressInFavourites(currentAddress) {
		if (currentAddress !== `Location not found...`) {
			let favourites = this.state.favourites;
			let found = false;
			favourites.forEach(element => {
				if (found === false) {
					if (element.address === currentAddress) {
						found = true;
					}
				}
			});
			return found;
		}
	}

	onFavouriteToggle = currentAddress => {
		if (this.isAddressInFavourites(currentAddress)) {
			this.removeFavourite(currentAddress);
		} else {
			this.addFavourite(currentAddress);
		}
	}

	removeFavourite = address => {
		let index = this.state.favourites.indexOf(address);
		if (index > -1) {
			this.state.favourites.splice(index, 1);
			localStorage.favourites = JSON.stringify(favourites);
		}
	}

	addFavourite = address => {
		if(address !== `Location not found...`) {
			
			this.state.favourites.push({
				address: address,
				timeStamp: Date.now()
			});

			this.setState({
				favourites
			});

			localStorage.favourites = JSON.stringify(favourites);
		}
	}


	componentDidMount() {
		console.log('App componentDidMount');
	}

	componentDidUpdate() {
		console.log('App componentDidUpdate');
	}

	static getDerivedStateFromProps(props, state) {
		console.log('App getDerivedStateFromProps');
		console.dir(props);
		console.dir(state);
		return state;
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('App getSnapshotBeforeUpdate');
		console.dir(prevProps);
		console.dir(prevState);
		return prevState;
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('App shouldComponentUpdate');
		console.dir(nextProps);
		console.dir(nextState);
		console.log(`should App update: ${!(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state))}`);
		return !(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state));
	}

	componentWillUnmount() {
		console.log('App componentWillUnmount');
	}

	async searchForAddress(address) {
		const concatAddress = address.replace(' ', '+');
		let currentState = this.state;
		currentState.currentAddress = address;
		try {
			const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${concatAddress}`;
			let response = await fetch(url);
			let responseJSON = await response.json();
			currentState.mapCoordinates = await responseJSON.results[0].geometry.location;
			console.log(currentState.mapCoordinates);
		}
		catch (error) {
			currentState.currentAddress = `Location not found...`;
			currentState.mapCoordinates = { lat: 0, lng: 0 };
		}

		this.setState({
			currentState
		});
	}

	onFavouriteToggle(currentAddress) {

	}

	render() {
		console.log('App render');
		return (
			<div>
				<h1>{this.props.title}</h1>
				<Search onSearch={this.searchForAddress} />
				<MapContainer coords={this.state.mapCoordinates} />
				<CurrentLocation
					address={this.state.currentAddress}
					favourite={this.isAddressInFavourites(this.state.currentAddress)}
					onFavouriteToggle={this.onFavouriteToggle}
				/>
			</div>
		);
	}
}

export default App;