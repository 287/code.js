var addEvent = function(el, type, fn){
	el && (el.addEventListener ? el.addEventListener(type, fn, false) : el.attachEvent && el.attachEvent('on'+ type, fn));
};