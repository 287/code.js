/**
 * @param {string|element} html
 */
function html2svg(html){
	var styles = [];
	var node;
	if(typeof html !== 'string'){
		html = html.outerHTML;
	}
	html = html.replace(/<style.*?>(.*?)<\/style>/g, function(t, m){
		styles.push(m);
		return '';
	});
	styles = styles.length === 0 ? '' : '<style type="text/css"><![CDATA['+ styles.join('') +']]></style>';
	// '<style><![CDATA[$1]]></style>');
	node = document.createElementNS('http://www.w3.org/2000/svg','svg');
	node.setAttribute('xmlns','http://www.w3.org/2000/svg','svg');
	node.innerHTML = styles + '<foreignObject x="0" y="0" width="100%" height="100%"><body xmlns="http://www.w3.org/1999/xhtml">'+ html +'</body></foreignObject>';
	return node;
}