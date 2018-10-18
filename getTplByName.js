/**
 * @param {string} name - eg: srcipt[name=name][type=text/tpl]
 * @return {null||string}
 */
function getTplByName(name){
	var rs = null;
	var nodes = document.getElementsByTagName('script');
	for(var i = 0, l = nodes.length, node; i < l; i++){
		node = nodes[i];
		if(node.getAttribute('name') == name && ['text/plain', 'text/template', 'text/tpl'].indexOf(node.type) > -1){
			rs = node.innerHTML;
			break;
		}
	}
	return rs;
}