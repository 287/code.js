//#!py
/**
 * *****************************
 * a  c  e     g  i  k     ag+ch+0 ai+cj+0 ak+cl+e
 * b  d  f  *  h  j  l  =  bg+dh+0 bi+dj+0 bk+dl+f
 * -----------------------------------------------
 * 0  0  1     0  0  1     0       0       1
 * ***********************************************
 * @include fixNumber
 * @param {array<number>} martrix - [a, b, c, d, e, f]
 * @return {array}
 */
function concatStyleMatrix(matrix, ...matrixs)
	matrixs.forEach(another=> {
		const list = []
		for let i = 0; i < 6; i++
			list[i] = matrix[i % 2] * another[i - (i % 2)] + matrix[(i % 2) + 2] * another[i - (i % 2) + 1] + (i > 3 ? matrix[i] : 0)
			list[i] = fixNumber(list[i])
		matrix = list
	})
	
	return matrix
// function concatStyleMatrix(base, ...args){
	// for(let matrix of args){
		// let list = [];
		// for(let i = 0; i < 6; i++){
			// list[i] = base[i % 2] * matrix[i - (i % 2)] + base[(i % 2) + 2] * matrix[i - (i % 2) + 1] + (i > 3 ? base[i] : 0);
		// }
		// base = list;
	// }
	// return base;
// }