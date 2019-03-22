import React from "react";

const OverviewTable = (props) => {

    let rows = props.pairs.map((pair, index) => {
        return (
            <tr key={index}>
                <td>{pair.domain}</td>
                <td>{pair.range}</td>
            </tr>
        )
    })    

    return (
        <div>
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
            <button onClick={props.delete}>Delete</button>
            <button onClick={props.edit}>Edit</button>
        </div>
        
    );
}

export default OverviewTable;