function isNode(o){
	return o != null && /Node/.test(o.constructor.name);
}