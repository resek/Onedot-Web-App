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
        <div>
            <Table rows={pairs}/>
            <button onClick={props.createDictionary}>Create</button>
        </div> 
    );
}

export default ShowPairs;