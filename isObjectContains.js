//#!py
/**
 * @desc 当前对象是否包含另一个对象，即拥有这个对象所有的键且值一致
 * @include eachObjectSome
 * @param {object} obj
 * @param {object} o
 * @return {boolean}
 */
function isObjectContains(obj, o)
	return !eachObjectSome(o, (value, key)=> obj[key] !== value)