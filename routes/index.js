/*
**********************************************
usage:
接口:
			post localhost:3000/add 	添加一条
				传入：{title:标题,content:内容,result:编译后内容}
				返回：{error:0, id: 新添加内容的ID, time: 添加时间}

			post localhost:3000/upd 	修改一条
				传入：{id:ID,title:标题,content:内容,result:编译后内容}
				返回：{error:0}

			post localhost:3000/ask 	获取数据
				返回：{error:0}

			post localhost:3000/del 	删除数据
				返回：{error:0}



	注意：	服务器所返回的时间戳都是秒（JS是毫秒）
**********************************************
*/
var express = require('express');
var router = express.Router();
var query = require('../connect');
var express = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});



//ask 可用
//router.post('/ask', con.ask());//正则可以使用
router.post('/commend/get', function(req, res, err) {
	query('SELECT * FROM noteeditor', function(err1, results, f) {
		if(err1) throw err1;
		else {
			console.log(1);
			res.send({
				data: results,
				error: 0
			});
		}
	});
});
//add
router.post('/commend/add', function(req, res, err) {
	var obj = req.body;

	query('INSERT INTO noteeditor (title,content,result) VALUES (?,?,?)', [obj.title, obj.content, obj.result], function(err1, results, fields) {
		if(err1) throw err1;
		else {
			res.send({
				Id: results.insertId,
				error: 0
			});
		}
	});
});
//upd
router.post('/commend/upd', function(req, res, err) {
	let obj = req.body;
	console.log(obj);
//	for (let name in)

	query(
		'UPDATE noteeditor SET title = ? , content = ? , result = ? WHERE Id = ?', [obj.title, obj.content, obj.result, obj.Id],
		function(err1, results, fields) {
			//		console.log("!!!");console.log(err1);
			//		console.log("!!!");console.log(results);
			//		console.log("!!!");console.log(fields);
			if(err1) throw err1;
			else {
				res.send({
					error: 0
				});
			}
			//		con.end();
		});

});
//del
router.post('/commend/del', function(req, res, err) {
	let obj = req.body; //obj 请求的个体
	query('DELETE FROM noteeditor WHERE id = ?', obj.Id, function(err1, results, fields) {
		if(err1) throw err1;
		else {
			res.send({
				error: 0
			});
		}
	})
	//	con.end();
});

//router.post('/new', function(req, res, err) {
//	let result1 = [];
//	let obj = req.body;
//
//	//	con.query('SELECT COUNT(*) FROM `news`', function(err, result2, f) {
//	//
//	//		result1.push(result2[0]);
//	//		console.log(result1);
//	//		//		res.send(result1);
//	//
//	//	});
//	con.query('SELECT * FROM `news` LIMIT ?,8', [obj.iNow * 8], function(err, result3, f) {
//		//			console.log(result3);
//		result1.push(result3);
//		console.log(result1);
//		res.send(result1);
//	});
//
//});
//router.post('/new2', con.pag2());

module.exports = router;