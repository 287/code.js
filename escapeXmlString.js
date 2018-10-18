/**
 * escape xml string
 * @include escapeString
 * @param {string} str
 * @return {string}
 */
function escapeXmlString(str){
	return escapeString(str, {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&apos;',
		'&': '&amp;',
	});
}



