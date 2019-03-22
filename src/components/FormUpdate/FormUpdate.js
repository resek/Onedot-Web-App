import React from "react";

const FormUpdate = (props) => {

    return (
        <>
        <form onSubmit={props.updateRow}>
            <label>
                Domain:
                <input defaultValue={props.updatePair[0]} required maxLength="50" type="text" name="domain" onChange={props.handleDomain} />
            </label>
            <label>
                Range:
                <input defaultValue={props.updatePair[1]} required maxLength="50" type="text" name="range" onChange={props.handleRange} />
            </label>
            <input type="submit" value="Update row" />
        </form>
        <button onClick={props.handleUpdate}>Cancel</button>
        </>
    );
}

export default FormUpdate;