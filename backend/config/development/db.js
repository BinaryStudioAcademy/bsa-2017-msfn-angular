module.exports = {
	dbname: 'msfn',
	uri: 'mongodb://localhost/msfn',
	mocked_db: false,
	opts: {
		server: {
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
};