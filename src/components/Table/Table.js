import React from "react";

const Table = (props) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Domain</th>
                    <th>Range</th>
                </tr>
            </thead>
            <tbody>
                {props.rows}
            </tbody>
        </table>
    );
}

export default Table;