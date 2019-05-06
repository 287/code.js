//#!py
/**
 * @require crypto
 * @param {string} str
 * @return {string}
 */
function hashByMd5(str)
	return crypto.createHash('md5').update(str).digest('hex')