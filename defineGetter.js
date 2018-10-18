function defineGetter(o, key, getter, setter){
	if(o){
		if(typeof getter === 'function') o.__defineGetter__(key, getter);
		if(typeof setter === 'function') o.__defineGetter__(key, setter);
	}
}