//#!py
/**
 * @include addEvent removeEvent
 * @param {function} cb - return true to skip removeEvent
 * @return {undefined}
 */
function addOnceEvent(node, type, cb)
	addEvent(node, type, once)
	
	function once(...args)
		if !cb.apply(this, args)
			removeEvent(node, type, once)