//#!py
/**
 * @desc 处理有多参数时，参数可选和兼容参数时操作；支持"前导参数"和"类型参数"；不符合规则使用null填充
 * @desc 前导参数支持列表 "?~"；支持一个字符；?:该参数是可选的, ~:兼容该参数，填充默认值或者类型转换
 * @desc 类型参数支持列表 "snbaof"；支持多个字符
 * @eg parseArgs(['name', ()=>{}], ['s', '~oa', 'f']) -> ['name', {}, ()=>{}]; parseArgs(['name', ()=>{}], ['s', '?o', 'f']) -> ['name', null, ()=>{}]
 * @include getType
 * @param {array<any>} args
 * @param {array<string>} rules
 * @return {array<any>}
 */
function parseArgs(args, rules)
	let index = 0
	
	return rules.map((rule, i)=>{
		let required = true
		let compatible = false
		
		if '?~'.includes(rule.charAt(0))
			if rule.charAt(0) === '~'
				compatible = true
				
			required = false
			rule = rule.slice(1)
		
		if rule.includes('*')
			rule = '*'
			compatible = false
		
		let arg = args[index]
		let typeChr = getType(arg).charAt(0)
		let inRule = rule === '*' ? true : rule.includes(typeChr)
		let ruleChr = rule.charAt(0)
		
		if inRule || required || arg === undefined
			index++
		
		if inRule
			if compatible && ruleChr !== typeChr
				arg = toType(arg, ruleChr)
		else
			if compatible
				arg = getDefault(ruleChr)
			else
				arg = null
			
		return arg
	})
	
	function toType(arg, rule)
		if rule === 'a'
			arg = [arg]
		else if rule === 's'
			arg += ''
		else if rule === 'n'
			arg *= 1
		else if rule === 'b'
			arg = !!arg
		else
			arg = getDefault(rule)
		
		return arg
		
	function getDefault(rule)
		let arg = null
		
		if rule === 's'
			arg = ''
		else if rule === 'n'
			arg = 0
		else if rule === 'b'
			arg = false
		else if rule === 'a'
			arg = []
		else if rule === 'o'
			arg = {}
		else if rule === 'f'
			arg = ()=>{}
			
		return arg