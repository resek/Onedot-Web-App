import React, { Component } from 'react';

import FormUpdate from "../../components/FormUpdate/FormUpdate";

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
                    <td><button onClick={() => {this.showUpdateForm(this.props.index, index, this.props.arr); this.props.handleUpdate()}}>Update</button></td>
                </tr>
            )
        });

        return (
            <div>
                {!this.props.update ?
                    <>
                    <table>
                        <thead>
                            <tr>
                                <th>Domain</th>
                                <th>Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <button onClick={this.props.handleEdit}>Close Edit</button>
                    </>
            : <FormUpdate
                handleUpdate={this.props.handleUpdate}
                updatePair={this.state.updatePair}
                updateRow={(e) => this.props.updateRow(e, this.state.pIndex, this.state.cIndex, this.state.updatePair)}
                handleDomain={this.props.handleDomain}
                handleRange={this.props.handleRange} />}
            </div>					
        );
    }
}

export default Edit;