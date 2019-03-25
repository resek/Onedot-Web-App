import React from "react";
import Table from "../../Table/Table";

const OverviewTable = (props) => {

    let rows = props.pairs.map((pair, index) => {
        return (
            <tr key={index}>
                <td>{pair.domain}</td>
                <td>{pair.range}</td>
            </tr>
        )
    });   

    return (
        <div>
            <Table rows={rows}/>
            <button onClick={props.delete}>Delete</button>
            <button onClick={props.edit}>Edit</button>
        </div>
        
    );
}

export default OverviewTable;