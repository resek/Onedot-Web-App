import React, { Component } from 'react';
import Form from "../../components/Form/Form";
import Table from "../../components/Table/Table";

class Edit extends Component {

    state = {
        updatePair: [],
        pIndex: null,
        cIndex: null,
    }    

	showUpdateForm = (pIndex, cIndex, propsArr) => {
		let arr = propsArr;
		let updatePair = [];
		updatePair[0] = arr[pIndex][cIndex][0];
		updatePair[1] = arr[pIndex][cIndex][1];
		this.setState({updatePair: updatePair, pIndex: pIndex, cIndex: cIndex});
    }

    render () {

        let pairs = [];
        let map = new Map(this.props.arr[this.props.index]);
        for (const [domain, range] of map) {
            pairs.push({domain, range});
        }

        let rows = pairs.map((pair, index) => {
            return (
                <tr key={index}>
                    <td>{pair.domain}</td>
                    <td>{pair.range}</td>
                    <td><button onClick={() => this.props.deleteRow(this.props.index, index)}>Delete</button></td>
                    <td><button onClick={() => {this.showUpdateForm(this.props.index, index, this.props.arr); this.props.handleTruthy("update")}}>Update</button></td>
                </tr>               
            )
        });

        let components;

        if (!this.props.update && !this.props.add) {
            components = (
                <div>
                    <Table rows={rows} />
                    <button className="EditButton" onClick={() => this.props.handleTruthy("add")}>Add row</button>
                    <button className="EditButton" onClick={this.props.handleEdit}>Close Edit</button>
                </div>
            )
        } 
        if (this.props.update) {
            components = (
                <div>
                    <h4>Update row</h4>
                    <Form
                        message={this.props.message}
                        value={this.state.updatePair}
                        submit={(e) => this.props.updateRow(e, this.state.pIndex, this.state.cIndex, this.state.updatePair)}
                        handleDomain={this.props.handleDomain}
                        handleRange={this.props.handleRange} />
                    <button onClick={() => this.props.handleTruthy("update")}>Cancel</button>
                </div>
            )       
        }
        if (this.props.add) {
            components = (
                <div>
                    <h4>Add new row</h4>
                    <Form
                        message={this.props.message}
                        value={[]}
                        submit={(e) => this.props.addRow(e)}
                        handleDomain={this.props.handleDomain}
                        handleRange={this.props.handleRange} />
                    <button onClick={() => this.props.handleTruthy("add")}>Cancel</button>
                </div>
            )
        }

        return (
            <>
            {components}
            </>					
        );
    }
}

export default Edit;