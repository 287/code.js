/**
 * @param {string} exp
 * @return {object}
 */
function parseEachExpression(exp){
	let object, params, ifExp;
	[exp, ifExp] = exp.split(' if ');
	[object, params] = exp.split(' as ');
	params  = params.split(',');
	ifExp = ifExp ? `if(!(${ifExp})) return; ` : '';
	return {
		object,
		params,
		ifExp,
	};
}