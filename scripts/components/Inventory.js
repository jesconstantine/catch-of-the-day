/* 
	Inventory
	<Inventory />
*/

import React from 'react';
import AddFishForm from './AddFishForm';

// {...this.props} spread, pass down all props
var Inventory = React.createClass({
	propTypes : {
		addFish : React.PropTypes.func.isRequired,
		removeFish : React.PropTypes.func.isRequired,
		loadSamples : React.PropTypes.func.isRequired,
		linkState : React.PropTypes.func.isRequired,
		fishes : React.PropTypes.object.isRequired

	},
	renderInventory : function (key) {
		var linkState = this.props.linkState;
		var removeFish = this.props.removeFish;
		return (
			<div className="fish-edit" key={key}>
				<input type="text" valueLink={linkState('fishes.' + key + '.name')} />
				<input type="text" valueLink={linkState('fishes.' + key + '.price')} />
				<select valueLink={linkState('fishes.'+ key + '.status')}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
				<input type="text" valueLink={linkState('fishes.' + key + '.image')} />
				<button onClick={removeFish.bind(null, key)}>Remove Fish</button>
			</div>
		)
	},
	render : function() {
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(this.renderInventory)}

				<AddFishForm {...this.props} />
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>

			</div>
		)
	}
});

export default Inventory;