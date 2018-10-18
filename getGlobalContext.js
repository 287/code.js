//#!py
/**
 * @desc 获取全局变量
 */
function getGlobalContext()
	return typeof window === 'object' ? window : global