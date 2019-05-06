//#!py
/**
 * @desc 将密码转换为散列值
 * @param {function} crypto
 * @param {string} passwd
 * @return {string}
 */
function hashPasswordWithSalt(crypto, passwd)
	return crypto(crypto(passwd) + passwd)