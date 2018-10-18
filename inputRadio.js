/**
 * @param {string} name - name of input radio
 * @param {string|number} value of input radio
 * @param {element} parent - parent to get input
 * @param {string|true|undefined}
 */
function inputRadio(name, value, parent){
	parent = parent || document;
	var els = parent.getElementsByName(name);
	if(value === undefined){
		for(var i = 0, el; i < els.length; i++){
			el = els[i];
			if(el.checked) return el.value;
		}
	}else{
		for(var i = 0, el; i < els.length; i++){
			el = els[i];
			if(el.value == value) return (el.checked = true);
		}
	}
}