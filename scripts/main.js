var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation; // mixin

var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var helpers = require('./helpers');

/*
	App
*/

var App = React.createClass ({	
	// run getInitialState before creates component and populate with whatever is returned
	getInitialState : function() {
		return {
			fishes : {},
			order : {}
		}
	},
	addFish : function(fish) {
		// use timestamp for unique ID
		var timestamp = (new Date()).getTime();
		// update state object
		this.state.fishes['fish-' + timestamp ] = fish;
		
		// set the state, pass object of only what has changed
		this.setState({ fishes : this.state.fishes });
	},
	render : function () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
				</div>
				<Order />
				<Inventory addFish={this.addFish} />
			</div>
		)
	}
});


/* 
	Add Fish Form
	<AddFishForm />
*/

var AddFishForm = React.createClass({
	createFish : function(event) {
		// 1. stop form from submitting
		event.preventDefault();

		// 2. take data from form and create object
		var fish = {
			name : this.refs.name.value,
			price : this.refs.price.value,
			status : this.refs.status.value,
			desc : this.refs.desc.value,
			image : this.refs.image.value
		}

		// 3. add fish to the App State
		this.props.addFish(fish);

		// 4. clear form
		this.refs.fishForm.reset();
	},
	render : function() {
		return (
			<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
		        <input type="text" ref="name" placeholder="Fish Name"/>
		        <input type="text" ref="price" placeholder="Fish Price" />
		        <select ref="status">
		          <option value="available">Fresh!</option>
		          <option value="unavailable">Sold Out!</option>
		        </select>
		        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
		        <input type="text" ref="image" placeholder="URL to Image" />
		        <button type="submit">+ Add Item </button>
		    </form>
		)
	}
});



/* 
	Header
	<Header />
*/

var Header = React.createClass({
	render : function() {
		return (
			<header className="top">
				<h1>Catch 
					<span className="ofThe">
						<span className="of">of</span>
						<span className="the">the</span> 
					</span>
				Day</h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
		)
	}
});

/* 
	Order
	<Order />
*/

var Order = React.createClass({
	render : function() {
		return (
			<p>Order</p>
		)
	}
});

/* 
	Inventory
	<Inventory />
*/

// {...this.props} spread, pass down all props
var Inventory = React.createClass({
	render : function() {
		return (
			<div>
				<h2>Inventory</h2>

				<AddFishForm {...this.props} />
			</div>
		)
	}
});

/*
	StorePicker
	this will let us make <StorePicker/>
*/

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

/*
	Not Found
*/

var NotFound = React.createClass({
	render : function() {
		return (
			<h1>NotFound!</h1>
		)
	}
})


/*
	Routes
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
	<Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));