import React, { Component } from 'react';

import FormCreate from "./components/FormCreate/FormCreate";
import ShowPairs from "./components/ShowPairs/ShowPairs";
import Overview from "./containers/Overview/Overview";

class App extends Component {

	state = {
		domain: null,
		range: null,
		map: new Map(),
		arr: []
	}

	componentDidMount() {
		if (localStorage.dictionaries) {
			const arr = JSON.parse(localStorage.dictionaries);
			this.setState({arr: arr})
		}
	}

	handleInput = (param) => (e) => {
		this.setState({[param]: e.target.value});
	}
	
	addPairToMap = (e) => {
		e.preventDefault();
		e.target.reset();
		const map = this.state.map;
		map.set(this.state.domain, this.state.range);							
		this.setState({map: map, domain: null, range: null});
	}

	createDictionary = () => {
		let arr = this.state.arr;
		arr.push(Array.from(this.state.map));
		localStorage.dictionaries = JSON.stringify(arr);
		this.setState({map: new Map(), arr: arr});
	}

	deleteDictionary = (index) => {
		let arr = this.state.arr;
        arr.splice(index, 1);
        localStorage.dictionaries = JSON.stringify(arr);
        this.setState({arr: arr});
    }

	render() {

		console.log(this.state.arr);

    	return (
			<div className="App">
				<h1>Dictionary Management App</h1>
				<FormCreate
					addPairToMap={this.addPairToMap} 
					handleDomain={this.handleInput("domain")}
					handleRange={this.handleInput("range")} />
				{this.state.map.size ? 
					<ShowPairs 
						map={this.state.map} 
						createDictionary={this.createDictionary} /> 
				: null}
				{this.state.arr.length ? 
					<Overview 
						arr={this.state.arr} 
						delete={this.deleteDictionary}/> 
				: <p>No dictionaries found</p>}
			</div>
    	);
 	}
}

export default App;
