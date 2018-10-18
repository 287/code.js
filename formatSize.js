//#!py
/**
 * @include formatNumber
 * @param {number} num
 * @return {string}
 */
function formatSize(num, verbose)
	return formatNumber(num, 1000, ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'], verbose)