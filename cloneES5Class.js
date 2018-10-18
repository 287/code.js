function cloneES5Class(srcClass, newClassName){
	var F = Function('return ' + srcClass.toString().replace(new RegExp(srcClass.name, 'g'), newClassName))()
	, key
	;
	for(key in srcClass.prototype) F.prototype[key] = srcClass.prototype[key];
	for(key in srcClass) if(!(key in F)) F[key] = srcClass[key];
	
	return F;
}