function getOutHtml(node){
	var html;
	if(node.outerHTML){
		html = node.outerHTML;
	}else{
		var pNode = document.createElement('div');
		pNode.appendChild(node.cloneNode(1));
		html = pNode.innerHTML;
	}
	return html;
}