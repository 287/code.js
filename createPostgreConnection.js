//#!py
function createPostgreConnection(op)
	const {Client} = new require('pg')
	const client = new Client(op)
	client.connect()
	
	client.queryAsync = async function(sql, params, op = {})
		let i = 0
		const newParams = []
		sql = sql.replace(/\?\??/g, (m)=> {
			let rs
			if m.length === 2
				rs = `"${params[i]}"`
			else
				newParams.push(params[i])
				rs = `$${newParams.length}`
				
			i++
			return rs
		})
		
		const conf = {
			text: sql,
			values: newParams,
			rowMode: (op.array || op[1]) && 'array',
		}
		
		const rs = await this.query(conf)
		
		if rs.command === 'SELECT'
			const {rows} = rs
			if op.one
				return rows[0]
			else if op[1]
				return rows[0] && rows[0][0]
			else
				return rows
		else
			return rs
		
	return client