/**
 * @include each, setElementStyle
 */
function setStyle(node, style){
	if(!node.tagName){
		Object.assign(node.style, style);
	}else{
		each(style, function(value, key){
			setElementStyle(node, key, value);
		});
	}
}