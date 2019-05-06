//#!py
/**
 * @desc 支持多行、注释、不写键的双引号
 * @include replaceStringByMark
 * @param {string} str
 * @return {object|null}
 */
function parseConfigJson(str)
	if str == null || str === ''
		return null
	
	// 剔除单行注释
	str = str.replace(/(^|\n)\s*(\/\/|#).*(?=\n|$)/g, '')
	
	// 剔除多行注释
	str = str.replace(/\/\*[^]*?\*\//g, '')
	
	// 提取字符串
	let marks
	[str, marks] = replaceStringByMark(str)
	
	marks.forEach((str, i, list)=>{
		if str.charAt(0) === "'"
			str = str.slice(1, -1).replace(/"/g, '\\"')
			list[i] = '"' + str + '"'
	})
	
	// 剔除空白字符串
	str = str.replace(/\s+/g, '')
	
	// 剔除列表中最后一个","
	str = str.replace(/,(\]|\})/g, '$1')
	
	// object key 添加 '"'
	str = str.replace(/(\{|,)([a-z0-9_\-\.]+)(:)/ig, '$1"$2"$3')
	
	// 小数没有前导0 添加 '0'
	str = str.replace(/(:\s*-?)(\.\d+)/ig, '$10$2')
	
	// 还原字符串
	str = str.replace(/<-(\d+)->/g, (t, m)=> marks[m].replace(/\f/g, '\\n'))
	
	let data = JSON.parse(str)
		
	return data