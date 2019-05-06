//#!py
/**
 * @include injectRequire parseJs
 * @return {undefined}
 */
function injectRequire4py()
	injectRequire()
	
	module.addParser('py', ['.js', '.jsx'], (content)=> {
		return parseJs(content)
	})