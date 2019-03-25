const validation = (map, aDomain, aRange) => {
	let messaga;
    for (const [domain, range] of map) {
		if (aDomain === domain && aRange === range) {
			messaga = "Duplicate Domains/Ranges";
		} else if (aDomain === domain) {
			messaga = "Duplicate Domains with different Ranges";
		} else if (aDomain === range && aRange === domain) {
			messaga = "Cycles: Two or more rows in a dictionary result in cycles";
		} else if (aDomain === range) {
			messaga = "Chains: A chain structure in the dictionary";
		}
	}
	return messaga 
}

export default validation;