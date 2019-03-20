import React from "react";

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
            <table>
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Range</th>
                    </tr>
                </thead>
                <tbody>
                    {pairs}
                </tbody>
            </table>
            <button onClick={props.createDictionary}>Create</button>
        </div> 
    );
}

export default ShowPairs;