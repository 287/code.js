//#!py
/**
 * @desc 在函数体字符串中获取变量名称
 * @include getGlobalContext getObjectAllKeys
 * @param {string} text - js expression
 * @param {array<string>} excludes - exclude keys
 * @return {array<string>} keys
 */
function getGlobalContextAllKeys()
	return getObjectAllKeys(getGlobalContext())