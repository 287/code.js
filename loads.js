//#!py
/**
 * @include eachAsync pipeAsync returnAsync isNonemptyString sortByDependents addArrayValues eachObjectFindKey eachObject
 * @param {array<string>} names
 * @param {object} op
 * @param {function} op.loadContent
 * @param {function} [op.getPath]
 * @param {function} [op.parseContent]
 * @param {function} [op.getDependents]
 * @param {object} [op.loadings = {}] - 加载内容暂存对象
 * @param {object} [op.contents = {}] - 内容数据暂存对象
 * @param {object} [op.pendings = {}] - 等待依赖暂存对象
 * @param {object} [op.dependents = {}] - 依赖列表暂存对象
 * @param {boolean} [op.verbose = false]
 * @return {undefined}
 */
function loads(names, op, cb)
	op = Object.assign({
		loadings: {},
		contents: {},
		pendings: {},
		dependents: {},
		verbose: false,
		getPath: null,
		parseContent: null,
		getDependents: null,
		loadContent: null,
	}, op);
	
	const {contents, loadings, dependents, pendings} = op
	const allNames = names.slice(0)
	
	eachAsync(
		allNames,
		(next, name)=>{
			// 已加载完成则直接返回结果
			if contents[name]
				return next()
				
			// 正在加载中，则添加回调
			if loadings[name]
				return loadings[name].push(next)
			
			// 设置加载回调暂存列表
			loadings[name] = []
			
			const param = {
				name,
				names,
				allNames,
				path: '',
				requires: []
			}
			
			pipeAsync(
			
				// 获取path
				(next)=>{
					if !op.getPath
						next(null, name)
					else
						returnAsync(op.getPath(name, param, next), next)
				},
				
				// 检查path
				(next, path)=> {
					if isNonemptyString(path)
						param.path = path;
						next(null, path);
					else
						let referBy = findReferBy(name)
						param.referBy = referBy
						referBy = referBy == null ? 'by loads' : `refer by "${referBy}"`
						next(`not found path "${name}" ${referBy}`);
				},
				
				// 根据path加载内容
				(next, path)=> returnAsync(op.loadContent(path, param, next), next),
				
				// 获取内容依赖
				(next, content)=> {
					param.content = content
					if !op.getDependents
						next(null)
					else
						returnAsync(op.getDependents(content, param, next), next)
				},
				
				// 检查依赖
				(pipeNext, depNames)=> {
					if depNames && depNames.length
						addArrayValues(param.requires, depNames)
						addArrayValues(allNames, param.requires)
						dependents[name] = param.requires
					
					if isAllDepsDone(name)
						// 依赖已完成时继续执行
						pipeNext()
					else
						// 依赖未完成时添加回调
						pendings[name] = pipeNext
						
						// 依赖未完成时添加回调
						next(true)
						
				},
				
				// 处理内容
				(next)=> {
					if !op.parseContent
						next(null, param.content)
					else
						returnAsync(op.parseContent(param.content, param, next), next)
				},
				
				// 暂存结果、执行被依赖检查
				(err, content)=> {
					contents[name] = content
						
					// 检查加载暂存
					loadings[name].forEach(cb=> cb())
					delete loadings[name]
					
					
					// console.log('load finish:', name)
					
					// 检查被依赖暂存
					eachObject(dependents, (requires, referBy)=> {
						if pendings[referBy] && requires.includes(name) && isAllDepsDone(referBy)
							// console.log('load finish:', referBy)
							pendings[referBy]()
							delete pendings[referBy]
					})
						
					next(err)
				}
			)
		},
		5,
		(err, rs)=>{
			if !err
				if op.verbose
					const sortedNames = sortByDependents(allNames, dependents);
					rs = {
						names,
						allNames,
						sortedNames,
						contents,
						dependents,
					}
				else
					rs = names.map(name=> contents[name])
			// console.log('loads rs:', names, rs, op)
			cb(err, rs)
		}
	)
	
	function isAllDepsDone(name)
		let isAllDone = !dependents[name] ? true : !dependents[name].some(name=> !(name in contents))
		// if isAllDone
			// delete dependents[name]
		return isAllDone
	
	function findReferBy(name)
		return eachObjectFindKey(dependents, requires => requires.includes(name))