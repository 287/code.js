//#!py
/**
 * @desc 创建一个键值存储器
 * @include createStorer readFile writeFile
 * @param {function} getter
 * @param {function} setter
 * @param {string} [type = 'json']
 * @return {function}
 */
function createFileStorer(op)
	op = Object.assign({
		prefix: '',
		suffix: '',
		type: '',
	}, op)
	
	return createStorer(
		(key)=> {
			try
				return readFile(op.prefix + key + op.suffix)
		},
		(key, value)=> {
			writeFile(op.prefix + key + op.suffix, value)
		},
		op.type,
	)