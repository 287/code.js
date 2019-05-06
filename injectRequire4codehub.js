//#!py
/**
 * @include injectRequire
 * @return {undefined}
 */
function injectRequire4codehub()
	injectRequire()
	
	module.addParser('codehub', ['.js', '.jsx'], (content)=> {
		const codehub = require('codehub').sync()
			
		codehub.getCodeContentByContent(content, (err, rs)=>{
			if err
				throw err
			content = rs
		})
		
		return content
	})