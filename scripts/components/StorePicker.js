/*
	StorePicker
	this will let us make <StorePicker/>
*/

import React from 'react';

import { History } from 'react-router';
import helpers from '../helpers';

var StorePicker = React.createClass({
	mixins : [History],
	goToStore : function(event) {
		event.preventDefault(); // prevent form from submitting data
		// get the data from the input
		var storeId = this.refs.storeId.value; 
		// this = storepicker
		// refs = input reference
		this.history.pushState(null, '/store/' + storeId);
		// pushState allows browser to change URL without refresh, #, !, etc.
		
		// transition from <StorePicker/> to <App/>
	},
	render : function() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" defaultValue={helpers.getFunName()} required />
				<input type="Submit" />
			</form>
		)
	}

});

export default StorePicker;