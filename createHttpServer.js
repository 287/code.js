/**
 * @require http https
 * @param {object} op
 * @param {boolean} [op.https = false]
 */
function createHttpServer(op){
	op = op || {};
	const Server = op.https ? https.Server : http.Server;
	const server = new Server(op.https && op);
	// server.listen(op.port);
	return server;
}