function removeEvent(el, type, fn){
	return el && (el.removeEventListener ? el.removeEventListener(type, fn, false) : el.detachEvent && el.detachEvent('on' + type, fn));
}