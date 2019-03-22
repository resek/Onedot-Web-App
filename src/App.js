import React, { Component } from 'react';

import FormCreate from "./components/FormCreate/FormCreate";
import ShowPairs from "./components/ShowPairs/ShowPairs";
import Overview from "./components/Overview/Overview";
import Edit from "./containers/Edit/Edit";

class App extends Component {

	state = {
		arr: [],
		map: new Map(),
		domain: null,
		range: null,
		edit: false,
		update: false,
		index: null,
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

	handleEdit = (index) => {
		this.setState({edit: !this.state.edit, index: index})
	}

	handleUpdate = () => {
		this.setState({update: !this.state.update})
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

	deleteRow = (pIndex, cIndex) => {
		let arr = this.state.arr;
		let edit = true;
		arr[pIndex].splice(cIndex, 1);
		if (!arr[pIndex].length) {
			arr.splice(pIndex, 1);
			edit = false;
		}
		console.log(arr);
		localStorage.dictionaries = JSON.stringify(arr);
		this.setState({arr: arr, edit: edit});
	}

	updateRow = (e, pIndex, cIndex, upadatePair) => {
		e.preventDefault();
		let arr = this.state.arr;
		let domain;
		let range;
		this.state.domain ? domain = this.state.domain : domain = upadatePair[0];
		this.state.range ? range = this.state.range: range = upadatePair[1];
		console.log(domain);
		console.log(range);
		arr[pIndex][cIndex][0] =  domain
		arr[pIndex][cIndex][1] = range;
		localStorage.dictionaries = JSON.stringify(arr);
		this.setState({arr: arr, update: false, domain: null, range: null})
	}

	render() {

		let components;

		if (!this.state.edit) {
			components = (
				<> 
				<FormCreate
					addPairToMap={this.addPairToMap} 
					handleDomain={this.handleInput("domain")}
					handleRange={this.handleInput("range")} />
				<Overview 
					arr={this.state.arr} 
					delete={this.deleteDictionary}
					edit={this.handleEdit} />
				</>
			)
		} 
		else {
			components = (
				<Edit
					handleEdit={this.handleEdit}
					handleUpdate={this.handleUpdate}
					deleteRow={this.deleteRow}
					update={this.state.update}
					arr={this.state.arr}
					index={this.state.index}
					updateRow={this.updateRow}
					handleDomain={this.handleInput("domain")}
					handleRange={this.handleInput("range")}  />						
			)
		}

    	return (
			<div className="App">
				<h1>Dictionary Management App</h1>
				{components}
				{this.state.map.size ?
					<ShowPairs 
						map={this.state.map} 
						createDictionary={this.createDictionary} /> 
				: null}
			</div>
    	);
 	}
}

export default App;
