//#!py
function getIpFromRequest(req)
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
	if ip
		ip = ip.split(':').slice(-1)[0]
	return ip