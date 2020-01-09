
/*
*
* Mongo DB configuration for localhost
*
* */

var config = {
	port: process.env.PORT || 8080,
	db: 'mongodb://127.0.0.1:27017',
	test_db: 'mongodb://127.0.0.1:27017'
}
module.exports = config;
