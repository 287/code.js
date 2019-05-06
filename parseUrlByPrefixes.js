//#!py
/**
 * @include isString isFunction
 */
function parseUrlByPrefixes(url, prefixes)
	for prefixes as parser prefix -
		if url.startsWith(prefix)
			url = url.slice(prefix.length)
			
			if isString(parser)
				url = parser + url
				
			else if isFunction(parser)
				url = parser(url)
				
			break
			
	return url