import React from "react";
import Table from "../Table/Table";

const ShowPairs = (props) => {

    const pairs = [];

    for (const [domain, range] of props.map) {
        pairs.push(
            <tr key={domain}>
                <td>{domain}</td>
                <td>{range}</td>
            </tr>
        )
    }

    return (
        <div className="Showpairs">
            <Table rows={pairs}/>
            <button id="create" onClick={props.createDictionary}>Create dictionary</button>
        </div> 
    );
}

export default ShowPairs;