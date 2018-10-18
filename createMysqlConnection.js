//#!py
/**
 * @require mysql
 * @include renameObjectKeys
 * @param {object} op
 * @return {object}
 */
function createMysqlConnection(op)
	op = Object.assign({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: '',
		database: '',
	}, op)
	renameObjectKeys(op, {
		name: 'database',
		db: 'database',
		pass: 'password',
		passwd: 'password',
	})
	
	const conn = mysql.createConnection(op)
	conn.connect()
	
	return conn