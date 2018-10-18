//#!py
/**
 * @include isPageReady addEvent removeEvent
 * @param {element|string} node
 * @return {undefined}
 */
function onPageReady(cb)
	if isPageReady()
		cb()
	else
		addEvent(document, 'readystatechange', check)
	
	function check()
		if isPageReady()
			removeEvent(document, 'readystatechange', check)
			cb()