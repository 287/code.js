//#!py
/**
 * @include 
 * @param {string|regexp} globRule
 * @param {string} string
 * @return {undefined|array<string>}
 */
function matchByGlobRule(globRule, string, op = {})
	let rs = null
	
	if globRule.exec
		rs = globRule.exec(string)
		// if rs
			// rs = rs.slice(1)
	else
		let match
		if op.withoutStarts && op.withoutEnds
			match = string.includes(globRule)
		else if op.withoutStarts
			match = string.endsWith(globRule)
		else if op.withoutEnds
			match = string.startsWith(globRule)
		else
			match = globRule === string
		
		if match
			rs = [globRule]
	
	return rs