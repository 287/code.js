//#!py
/**
 * @require fs
 * @include injectRequire getBasename
 * @return {undefined}
 */
function injectRequire4codehub()
	injectRequire()
	
	module.addParser('codehub', ['.js', '.jsx'], (content, filename, module)=>{
		const codehub = require('codehub').sync()
			
		codehub.getCodeContentByContent(content, (err, rs)=>{
			if err
				throw err
			content = rs
			if module.parserNames.includes('log')
				console.log(content)
			else if module.parserNames.includes('debug')
				let path = codehub.conf.path.tmp + getBasename(filename)
				fs.writeFileSync(path, content)
				console.log(`[codehub inject] build to ${path}`)
		})
		
		return content
	})