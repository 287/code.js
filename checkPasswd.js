/**
 * @include md5
 * @param {string} passwd - the passwd stored
 * @param {string} hash - the hash string from user login
 * @param {string} random - random string
 * @return {boolean}
 */
function checkPasswd(passwd, hash, random){
	return md5(passwd + (random || '')) === hash;
}