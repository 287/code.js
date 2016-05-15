function addEvent(el, type, fn){
	return el && (el.addEventListener ? el.addEventListener(type, fn, false) : el.attachEvent && el.attachEvent('on' + type, fn));
}