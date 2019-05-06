//#!py
/**
 * @include eachObject addEvent
 * @param {element} node
 * @param {object} events
 * @return {undefined}
 */
function addEvents(node, events)
	eachObject(events, (event, type)=> addEvent(node, type, event))