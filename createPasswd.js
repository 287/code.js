/**
 * @include md5
 * @param {string} passwd - the passwd of user input
 * @param {string} random - random string
 * @return {string} hash
 */
function createPasswd(passwd, random){
	passwd = md5(md5(passwd) + passwd);
	return !random ? passwd : md5(passwd + random);
}