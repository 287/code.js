//#!py
/**
 * @include toUnixPath getBasename isFunction pipeAsync isBoolean
 */
function concatDefineModuleDir(dir, op, cb)
	dir = toUnixPath(dir, 1)
	
	if isFunction(op)
		cb = op
		op = null
	
	op = Object.assign({
		cwd: true,
		define: 'define',
	}, op)
	
	let cwd = op.cwd + ''
	if isBoolean(op.cwd)
		cwd = op.cwd ? getBasename(dir) + '/' : ''
	
	let dirName = dir.slice(0, -1)
	let distPath = `${dirName}.js`
	let tmpPath = `${dirName}.swp`
	
	pipeAsync(
		/**
		 * @include readDirAsync
		 */
		(next)=> readDirAsync(dir, {relative: false, recursive: true, filter: '.js'}, next),
		/**
		 * @include eachAsync
		 */
		(next, files)=> eachAsync(
			files,
			/**
			 * @include getExtname getDirname
			 */
			(next, path, i)=> {
				// let path = dir + file
				let extname = getExtname(path)
				let moduleName = cwd + path.slice(dir.length, -extname.length)
				let basename = getBasename(moduleName)
				if basename === 'index'
					moduleName = getDirname(moduleName)
					
				let moduleDir = getDirname(moduleName)
				/**
				 * @include readFileAsync getDocTagValues
				 */
				pipeAsync(
					(next)=> readFileAsync(path, next),
					(next, content)=> {
						content += ''
						let [requireNames, referNames] = getDocTagValues(content, 'import', true)
						let exportName = getDocTagValues(content, 'export')[0] || 'main'
						let includes = getDocTagValues(content, 'include')
						let includesString = ''
						if includes.length > 0
							requireNames.push('includes')
							referNames.push('includes')
							includesString = `\n\tconst {${includes.join(', ')}} = includes`
						
						referNames.forEach((name, i, list)=> {
							list[i] = name.replace(/\W/g, '')
						})
						
						next(null, [
							`${op.define}('${moduleName}', [${requireNames.map(name=> `"${name}"`).join(', ')}], (${referNames.join(', ')})=> {${includesString}`,
							[content, path, 1],
							`\treturn ${exportName};\n});`,
						])
					},
					next
				)
			},
			10,
			next
		),
		(next, concats)=> {
			/**
			 * @include concatWithSourceMap writeFile
			 */
			concats = [].concat(...concats)
			console.log(concats)
			concats = concatWithSourceMap(concats, op)
			writeFile(distPath, concats[0])
			writeFile(distPath + '.map', concats[1])
			next(null, concats)
		},
		cb
	)
	
concatDefineModuleDir('D:/web/git/code.js/test/defineModules/project1', (err)=> console.log(err ? err : 'finish'))