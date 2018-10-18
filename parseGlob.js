/**
 * @include isString
 * @param {string} glob
 * @return {string|regexp}
 */
function parseGlob(glob){
	if(!isString(glob)) return '';
	if(!/[\*\?\[\{]/.test(glob)) return glob;

	return new RegExp('^' + parse(glob) + '$');
	
	function parse(glob){
		return glob.replace(/[\.\(\)\|]/g, function(key){
			return '\\' + key;
		})
		// replace keyword
		.replace(/\*{2}|\*|\?|\{.*?\}|\[.*?\]/g, function(key, m){
			switch(key.charAt(0)){
			case '{':
				m = '(' + parse(key.slice(1, -1)).replace(/,/g, '|') + ')';
			break; case '[':
				m = key;
			break; default:
				m = ({
					'?': '\\w',
					'*': '`1',
					'**': '`2',
				})[key];
			}
			return m;
		})
		.replace(/`(\d)/g, function(t, key){
			return ['[^\\/]*', '.*'][key - 1];
		});
	}
}