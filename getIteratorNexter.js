//#!py
function getIteratorNexter(iterator)
	function next()
		const rs = iterator.next()
		if !rs.done
			return rs.value
			
	Object.assign(next, {
		target: iterator,
	})
	
	return next