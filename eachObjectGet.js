//#!py
/**
 * @include eachToGet eachObjectSome
 * @param {object} o
 * @param {function} cb
 * @return {any|undefined}
 */
function eachObjectGet(o, cb)
	return eachToGet(eachObjectSome, o, cb)