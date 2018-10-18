/**
 * @param {element} iframe
 * @param {object}
 */
function getIframeJson(iframe){
	var html = iframe && iframe.contentDocument && iframe.contentDocument.body.innerHTML;
	if(html == null)
		return;
	var i1 = html.indexOf('[');
	var i2 = html.indexOf('{');
	var is, ie;
	var key = '';
	var rs;
	if(i1 > -1 && i2 > -1){
		key = i1 < i2 ? '[' : '{';
		is = Math.min(i1, i2);
	}else if(i1 > -1 || i2 > -1){
		key = i1 > i2 ? '[' : '{';
		is = Math.max(i1, i2);
	}
	
	if(key !== ''){
		ie = html.lastIndexOf(key === '[' ? ']' : '}');
		if(ie > -1 && ie > is){
			html = html.slice(is, ie + 1);
			rs = JSON.parse(html);
		}
	}
	return rs;
}