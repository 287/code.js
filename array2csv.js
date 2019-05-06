/**
 * @include array2string
 * @param {array<array>} csv
 * @return {string}
 */
function array2csv(array){
	return String.fromCharCode(0xFEFF) + array2string(array, [',', '\r\n']);
}