import React from "react";

const FormCreate = (props) => {
    return (
        <form onSubmit={props.addPairToMap}>
            <label>
                Domain:
                <input required maxLength="50" type="text" name="domain" onChange={props.handleDomain} />
            </label>
            <label>
                Range:
                <input required maxLength="50" type="text" name="range" onChange={props.handleRange} />
            </label>
            <input type="submit" value="Add row" />
        </form>
    );
}

export default FormCreate;