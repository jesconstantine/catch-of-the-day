/*
	App
*/

import React from 'react';
import Catalyst from 'react-catalyst';
// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://catch-of-the-day-jc.firebaseio.com/');


	/* 
		ES6 Import Components
	*/

	import Header from './Header';
	import Fish from './Fish';
	import Order from './Order';
	import Inventory from './Inventory';


var App = React.createClass ({	
	mixins : [Catalyst.LinkedStateMixin],
	// run getInitialState before creates component and populate with whatever is returned
	getInitialState : function() {
		return {
			fishes : {},
			order : {}
		}
	},
	componentDidMount : function() {
		base.syncState(this.props.params.storeId + '/fishes', {
			context : this,
			state : 'fishes'
		});

		// restore order from local storage
		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

		if(localStorageRef) {
			// update component state to reflect what is in local Storage
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}

	},
	componentWillUpdate : function(nextProps, nextState) {
		localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));		
	},
	addFish : function(fish) {
		// use timestamp for unique ID
		var timestamp = (new Date()).getTime();
		// update state object
		this.state.fishes['fish-' + timestamp ] = fish;
		
		// set the state, pass object of only what has changed
		this.setState({ fishes : this.state.fishes });
	},
	removeFish : function(key) {
		if(confirm("Are you sure you want to remove this fish?!")) {
			this.state.fishes[key]=null;
			// to avoid multiple renders, run this after all updates
			this.setState({
				fishes: this.state.fishes
			});
		}
	},
	addToOrder : function(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({order: this.state.order });
	},
	removeFromOrder : function(key) {
		delete this.state.order[key];
		this.setState({
			order: this.state.order
		});
	},
	loadSamples : function() {
		// push items into state
		this.setState({
			fishes : require('../sample-fishes')
		});
	},
	renderFish : function(key) {
		return (
			<Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
		)
	},
	render : function () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{
							// Object.keys returns array of all keys in object
							// run renderFish once for every fish that we have in state
							Object.keys(this.state.fishes).map(this.renderFish)
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState} removeFish={this.removeFish} />
			</div>
		)
	}
});

export default App;