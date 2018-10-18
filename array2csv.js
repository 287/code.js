/**
 * @include array2string
 * @param {array<array>} csv
 * @return {string}
 */
function array2csv(array){
	return array2string(array, [',', '\r\n']);
}