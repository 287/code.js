//#!py
/**
 * @include eachObject renameObjectKey
 * @param {object} o
 * @param {object} keyAlias
 * @return {object}
 */
function renameObjectKeys(o, keyAlias)
	eachObject(keyAlias, (newKey, key)=> renameObjectKey(o, key, newKey))
	return o