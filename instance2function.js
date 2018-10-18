/**
 * @param {object} o - instance by class
 * @param {function} fn - 
 * @return {function} fn
 */
function instance2function(o, fn){
	for(var key in o){
		if(o.hasOwnProperty(key)){
			fn[key] = o[key];
		}
	}
	Object.getOwnPropertyNames(o.__proto__).forEach((key)=>{
		if(typeof o[key] === 'function' && ['constructor'].indexOf(key) === -1){
			fn[key] = function(){
				return o[key].apply(o, arguments);
			};
		}
	});
	fn.constructor = o.constructor;
	return fn;
}