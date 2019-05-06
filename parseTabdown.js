//#!py
/**
 * 编译css - 依赖tab或4个空格缩进层级，不支持单行声明(eg: body{margin:0})，支持单行多行注释，自动补全属性值结尾";"，支持写或不写"{"、"}"
 * @include getTreeFromStringByTab serializeTree replaceStringByMark eachChilds splitOnce toSnakeCase object2array getByRecursive object2string isObject
 * @param {string} css
 * @param {object|boolean} [op] - minify or option
 * @param {boolean} [op.minify = false]
 * @param {boolean} [op.autopx = true]
 * @return {string}
 */
function parseTabdown(str)
	let [content, marks, mark] = replaceStringByMark(str)
	
	const tree = getTreeFromStringByTab(content)
	const html = serializeTree(tree, {
		// removeRoot: true,
		withTab: false,
		sep: '',
		getWrapStart: (node, conf)=>{
			return `<tdn l="${conf.level}" i="${conf.subindex}">${node.content}`
		},
		getWrapEnd: (node)=>{
			return `</tdn>`
		},
	})
	console.log(tree)
	console.log(html)
	
	return html