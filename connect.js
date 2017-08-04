var mysql = require("mysql");

var pool = mysql.createPool({
	connectionLimit: 1000,
	host: 'localhost',
	port: 8888,
	user: 'root',
	password: '',
	database: '2017-7-23'
});


var query = function(sql, array, callback) {
	pool.getConnection(function(err, conn) {
		if(err) {
			callback(err, null, null);
		} else {
			var mysql = require("mysql");
			//防止mysql 注入
			let array1=[];
			if(array instanceof Array)
				array1 = array.map(ele => mysql.escape(ele));
			//			console.log(array1);
			conn.query(sql, array, function(qerr, vals, fields) {

				//事件驱动回调
				callback(qerr, vals, fields);
				//释放连接

				conn.release();

			});
		}
	});
};

module.exports = query;