//#!py
/**
 * @include addEvent
 */
function onPageUnload(cb)
	addEvent(window, 'beforeunload', cb)