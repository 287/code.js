//#!py
/**
 * @include injectRequire parsePy
 * @return {undefined}
 */
function injectRequire4py()
	injectRequire()
	
	module.addParser('py', ['.js', '.jsx'], (module, filename, content)=>{
		content = parsePy(content)
			
		return content
	})