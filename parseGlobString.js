//#!py
/**
 * @include isString isRegExp
 * @param {string} glob
 * @param {object} [op]
 * @param {boolean} [op.withoutStarts = false]
 * @param {boolean} [op.withoutEnds = false]
 * @return {string|regexp}
 */
function parseGlobString(rule)
	return parse(rule)
	
	function parse(rule)
		rule = rule.replace(/\*{2}|\*|\?|\(.*?\)/g, (key, index, str)=> {
			if str.charAt(index - 1) === '\\'
				return key
				
			if key.charAt(0) === '('
				return '(' + parse(key.slice(1, -1)) + ')'
				
			select key
				case '?'
					return '\\w'
					
				case '*'
					return '[^\\/]*'
					
				case '**'
					return '.*'
				
				default
					return key
		})
		
		return rule