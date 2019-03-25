import React, { Component } from 'react';
import Form from "./components/Form/Form";
import ShowPairs from "./components/ShowPairs/ShowPairs";
import Overview from "./components/Overview/Overview";
import Edit from "./containers/Edit/Edit";
import validation from "./utils/validation";
import "./App.css";

class App extends Component {

	state = {
		arr: [],
		map: new Map(),
		domain: null,
		range: null,
		edit: false,
		update: false,
		add: false,
		index: null,
		message: null,
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
		this.setState({edit: !this.state.edit, index: index, message: null})
	}

	handleTruthy = (param) => {
		this.setState({[param]: !this.state[param], message: null});
	}
	
	addPairToMap = (e) => {
		e.preventDefault();
		const map = this.state.map;		
		const rValue = validation(map, this.state.domain, this.state.range);
		if (rValue) {
			e.target.reset();
			this.setState({message: rValue, domain: null, range: null});	
		} else {
			e.target.reset();
			map.set(this.state.domain, this.state.range);							
			this.setState({map: map, domain: null, range: null, message: null});
		}		
	}

	createDictionary = () => {
		let arr = this.state.arr;
		arr.push(Array.from(this.state.map));
		localStorage.dictionaries = JSON.stringify(arr);
		this.setState({map: new Map(), arr: arr, message: null});
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
		localStorage.dictionaries = JSON.stringify(arr);
		this.setState({arr: arr, edit: edit});
	}

	updateRow = (e, pIndex, cIndex, upadatePair) => {
		e.preventDefault();
		let arr = this.state.arr;
		let domain, range;
		let map = new Map(arr[pIndex]);
		const rValue = validation(map, this.state.domain, this.state.range);
		if (rValue) {
			e.target.reset();
			this.setState({message: rValue, domain: null, range: null});
		} else {
			this.state.domain ? domain = this.state.domain : domain = upadatePair[0];
			this.state.range ? range = this.state.range: range = upadatePair[1];
			arr[pIndex][cIndex][0] =  domain
			arr[pIndex][cIndex][1] = range;
			localStorage.dictionaries = JSON.stringify(arr);
			this.setState({arr: arr, update: false, domain: null, range: null, message: null});
		}		
	}

	addRow = (e) => {
		e.preventDefault();
		let arr = this.state.arr;
		let map = new Map(arr[this.state.index]);
		const rValue = validation(map, this.state.domain, this.state.range);
		if (rValue) {
			e.target.reset();
			this.setState({message: rValue, domain: null, range: null});
		} else {
			map.set(this.state.domain, this.state.range);
			arr.splice(this.state.index, 1, Array.from(map));
			localStorage.dictionaries = JSON.stringify(arr);
			this.setState({arr: arr, domain: null, range: null, add: false, message: null});
		}		
	}

	render() {

		let components;

		if (!this.state.edit) {
			components = (
				<>
					<h4>Add row to dictionary:</h4>
					<Form
						message={this.state.message}
						value={[]}
						submit={this.addPairToMap} 
						handleDomain={this.handleInput("domain")}
						handleRange={this.handleInput("range")} />
					<div className="Display">
					{this.state.map.size ?
						<ShowPairs 
							map={this.state.map} 
							createDictionary={this.createDictionary} />
						: null}					
						<Overview 
							arr={this.state.arr} 
							delete={this.deleteDictionary}
							edit={this.handleEdit} />						
					</div>
				</>
			)
		} 
		else {
			components = (
				<Edit
					message={this.state.message}
					handleEdit={this.handleEdit}
					handleTruthy={this.handleTruthy}
					deleteRow={this.deleteRow}
					update={this.state.update}
					add={this.state.add}
					arr={this.state.arr}
					index={this.state.index}
					updateRow={this.updateRow}
					addRow={this.addRow}					
					handleDomain={this.handleInput("domain")}
					handleRange={this.handleInput("range")}  />						
			)
		}

    	return (
			<div className="App">
				<h2>Dictionary Management App</h2>
				{components}
			</div>
    	);
 	}
}

export default App;
