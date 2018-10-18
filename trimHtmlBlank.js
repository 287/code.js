/**
 * 移除html中的空白字符串，避免产生空白文字节点
 * @include trim
 * @param {string} html
 * @return {string}
 */
function trimHtmlBlank(html){
	html = html.replace(/\r?\n/g, '\f').replace(/>\f(\t| {4})*</g, '><');
	return trim(html);
}