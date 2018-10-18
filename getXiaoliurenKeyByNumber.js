//#!py
function getXiaoliurenKeyByNumber(...args)
	const keys = ['大安', '留连', '速喜', '赤口', '小吉', '空亡']
	args = args.filter(v=> v)
	const index = (args.reduce((c, v)=> c + v, 0) - args.length) % 6
	return keys[index]