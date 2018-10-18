/**
 * @include parseCss addStyleNode
 * @param {string} style - cssz rule
 * @param {string} [key] - style node id
 * @return {element}
 */
function addCssNode(style, key){
	style = parseCss(style);
	return addStyleNode(style, key);
}