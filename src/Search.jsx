import React from 'react';

export default class Search extends React.Component {
	constructor() {
		super();

		this.state = {
		value: ''
		}
		
		this.handleChange = event => {
			this.setState({
				value: event.target.value
			});
		}

		this.handleSubmit = event => {
			event.preventDefault();
			this.props.onSearch(this.state.value);
			
		}
	}

	componentDidMount() {
		console.log('Search componentDidMount');
	}

	componentDidUpdate() {
		console.log('Search componentDidUpdate');
	}

	static getDerivedStateFromProps(props, state) {
		console.log('Search getDerivedStateFromProps');
		console.dir(props);
		console.dir(state);
		return state;
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('Search getSnapshotBeforeUpdate');
		console.dir(prevProps);
		console.dir(prevState);
		return prevState;
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('Search shouldComponentUpdate');
		console.dir(nextProps);
		console.dir(nextState);
		console.log(`should Search update: ${!(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state))}`);
		return !(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state));
	}

	componentWillUnmount() {
		console.log('Search componentWillUnmount');
	}

	render() {
		return (
		<form id="geocoding_form" className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
			<div className="form-group">
				<div className="col-xs-12 col-md-6 col-md-offset-3">
					<div className="input-group">
					<input 
						type="text" 
						className="form-control" 
						id="address" 
						placeholder="Find a location..." 
						value={this.state.value} 
						onChange={this.handleChange.bind(this)} 
					/>
					<span className="input-group-btn">
						<span 
							className="glyphicon glyphicon-search" 
							aria-hidden="true" 
							onClick={this.handleSubmit.bind(this)}
						>
						</span> 
					</span>
					</div>
				</div>
			</div>
		</form>
		);
	}
}
