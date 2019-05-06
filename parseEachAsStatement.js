//#!py
/**
 * @include splitOnce trim
 */
function parseEachAsStatement(str)
	const rs = {
		object: '',
		key: '',
		value: '',
		if: '',
	}
	
	let tmp
	[str, tmp] = splitOnce(str, ' if ', undefined, true)
	if tmp !== undefined
		rs.if = trim(tmp)
		
	[str, tmp] = splitOnce(str, ' as ', undefined, true)
	if tmp !== undefined
		tmp = tmp.split(',')
		['value', 'key'].forEach((key, i)=> {
			if tmp[i] !== undefined
				rs[key] = trim(tmp[i])
		})
		
	rs.object = trim(str)
	
	return rs
	