function createAutoVedioNode(src){
	var node = document.createElement('video');
	node.loop = true;
	node.autoplay = true;
	node.src = src;
	return node;
}