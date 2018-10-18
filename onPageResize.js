//#!py
/**
 * @include addEvent concatTimeout
 */
function onPageResize(cb, interval = 300)
	runcb(cb)
	
	addEvent(window, 'resize', concatTimeout(runcb, interval))
	
	function runcb()
		cb(...getSize())
	
	function getSize()
		return [document.body.clientWidth, document.body.clientHeight]