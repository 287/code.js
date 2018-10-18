//#!py
/**
 * @include getUserHomeDir toUnixPath readConfigJsonFile
 * @param {string} name
 * @return {object|null}
 */
function getUserConfigJson(name)
	let path = toUnixPath(getUserHomeDir(), 1) + name
	return readConfigJsonFile(path)