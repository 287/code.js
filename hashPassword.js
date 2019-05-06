//#!py
/**
 * @desc 将密码转换为散列值
 * @param {function} crypto
 * @param {string} passwd
 * @return {string}
 */
function hashPassword(crypto, passwd, solt = '')
	return crypto(passwd + solt)