//#!py
/**
 * @include isPureObject
 * @return {boolean}
 */
function isObjectArray(arr)
	return arr.length > 0 && isPureObject(arr[0])