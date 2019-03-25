import React from "react";

const Form = (props) => {

    return (
        <>        
        <form onSubmit={props.submit}>
            <label id="domain">
                Domain:
                <input defaultValue={props.value[0]} required maxLength="40" type="text" name="domain" onChange={props.handleDomain} />
            </label>
            <label>
                Range:
                <input defaultValue={props.value[1]} required maxLength="40" type="text" name="range" onChange={props.handleRange} />
            </label>
            <input type="submit" value="Confirm" />            
        </form>
        <div className="ErrorMessage">{props.message}</div>
        </>
    );
}

export default Form;