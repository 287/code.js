/**
 * @param {string} src
 * @param {function} cb
 * @return {<element>}
 */
function loadScript(src, cb){
	var node = document.createElement('script');
	node.src = src;
	node.onload = function(e){
		cb && cb(null, this);
	};
	node.onerror = cb;
	(document.head || document.body).appendChild(node);
	return node;
}