/**
 * params: {a: [1], b: [3, 4]} -> [{a: 1, b: 3}, {a: 1, b: 4}]
 * 
 * @include each
 * @param {object} params
 * @return {array<object>}
 */
function mixParams(params){
	let lastList = [];
	each(params, (values, key)=>{
		let tList = [];
		let tList2 = [];
		each(values, (value)=>{
			let o = {};
			o[key] = value;
			tList.push(o);
		});
		each(lastList, (a)=>{
			each(tList, (b)=>{
				tList2.push(Object.assign({}, a, b));
			});
		});
		lastList = tList2.length ? tList2 : tList;
	});
	return lastList;
}