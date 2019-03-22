import React from 'react';

import OverviewTable from "./OverviewTable/OverviewTable";

const Overview = (props) => {

    let dictionaries;

    dictionaries = props.arr.map((element, index) => {
        let pairs = [];
        let map = new Map(element);
        for (const [domain, range] of map) {
            pairs.push({domain, range});
        }
        return <OverviewTable 
            key={index} 
            delete={() => {props.delete(index)}} 
            edit={() => {props.edit(index)}}
            pairs={pairs} />   
    });            

    return (
        <div>
            {dictionaries}
        </div> 
    );  
}

export default Overview;