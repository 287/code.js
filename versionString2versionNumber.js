//#!py
function versionString2versionNumber(str = '', ratio = 1000)
	const num = str.split('.').reduce((c, v, i, arr)=> c + v * Math.pow(ratio, arr.length - i - 1), 0)
	
	/**
	 * @include isPureNumber
	 */
	return isPureNumber(num) && num