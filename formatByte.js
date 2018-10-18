//#!py
/**
 * @include formatNumber
 * @param {number} num
 * @return {string}
 */
function formatByte(num, verbose)
	return formatNumber(num, 1024, ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], verbose)