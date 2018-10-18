/**
 * @include typeOf, eachArray, eachObject
 * @param {array<string>} keys
 * @param {string} [objectName = 'this']
 * @return {string}
 */
function toJson(o){
	return JSON.stringify(clone(o));
	// return clone(o);
		
	function clone(o){
		const type = typeOf(o);
		const noCopyTypes = ['number', 'string', 'boolean', 'null', 'undefined'];
		const toStringTypes = ['regexp', 'function'];
		let rs;
		
		if(noCopyTypes.includes(type)){
			rs = o;
		}else if(toStringTypes.includes(type)){
			rs = o.toString();
		}else if(type === 'array'){
			rs = [];
			eachArray(o, (value)=> rs.push(clone(value)));
		}else{
			rs = {};
			eachObject(o, (value, key)=> rs[key] = clone(value));
		}
		
		return rs;
	}
}