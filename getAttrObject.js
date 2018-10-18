/**
 * @include isString, string2object
 * @param {element} node
 * @param {string} [attr = 'conf']
 * @return {null|object}
 */
function getAttrObject(node, attr){
	let rs = null;
	let str = node.getAttribute(attr || 'conf');
	if(isString(str)){
		rs = string2object(str);
	}
	return rs;
}