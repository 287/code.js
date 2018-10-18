/**
 * @param {string} id
 * @param {string} [html]
 * @return {element}
 */
function getNodeOrCreate(id, html){
	var node = document.getElementById(id);
	if(!node){
		node = document.createElement('div');
		node.innerHTML = html || '';
		node = node.childNodes[0] || node;
		node.id = id;
		document.body.appendChild(node);
	}
	return node;
}