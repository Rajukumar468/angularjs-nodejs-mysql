var express = require('express');
const app = express();
const bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var con=mysql.createPool({
	connectionLimit:50,
	host:'localhost',
	user:'root',
	password:'root',
	database:'app'
});


// con.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/app', function (req, res) {
	con.getConnection(function(error, tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');
		}else{
			tempCont.query('SELECT * FROM student', function (error, results, fields) {
				tempCont.release();
		        if (!!error){
		        	console.log("Error in query");
		        }else{
		        	res.json(results);
		        }
		    });
		}
	});
	
});

router.get('/api/student/:id', function (req, res) {
	console.log('get');
	con.getConnection(function(error, tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');
		}else{
			let sql = `SELECT * FROM student WHERE id = ${req.params.id}`;
			tempCont.query(sql, function (error, results, fields) {
				tempCont.release();
		        if (!!error){
		        	console.log("Error in query");
		        }else{
		        	res.json(results);
		        }
		    });
		}
	});
	
});

router.post('/api/student/add', function (req, res) {
	var input = req.body;
	con.getConnection(function(error, tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');
		}else{
			let sql = "INSERT INTO student (`name`, `desc`) VALUES ?";
			let values = [[input.name, input.desc]];
			tempCont.query(sql, [values],function (error, results, fields) {
				tempCont.release();
		        if (!!error){
		        	console.log(error);
		        }else{
		        	con.getConnection(function(error, tempCont){
						if(!!error){
							tempCont.release();
							console.log('Error');
						}else{
							tempCont.query('SELECT * FROM student', function (error, results, fields) {
								tempCont.release();
						        if (!!error){
						        	console.log("Error in query");
						        }else{
						        	res.json(results);
						        }
						    });
						}
					});
		        	// res.json(results);
		        }
		    });
		}
	});
});

router.post('/api/student/save', function (req, res) {
	var input = req.body;
	con.getConnection(function(error, tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');
		}else{
			//let sql = `UPDATE users SET Name = ? WHERE UserID = ? id = ${req.params.id}`;
			tempCont.query("UPDATE student SET `name` = ?, `desc` = ? WHERE id = ?", [input.name,input.desc,input.id],function (error, results, fields) {
				tempCont.release();
		        if (!!error){
		        	console.log(error);
		        }else{
		        	con.getConnection(function(error, tempCont){
						if(!!error){
							tempCont.release();
							console.log('Error');
						}else{
							tempCont.query('SELECT * FROM student', function (error, results, fields) {
								tempCont.release();
						        if (!!error){
						        	console.log("Error in query");
						        }else{
						        	res.json(results);
						        }
						    });
						}
					});
		        	// res.json(results);
		        }
		    });
		}
	});
});

router.delete('/api/student/:id', function (req, res) {
	console.log('Deleting');
	con.getConnection(function(error, tempCont){
		if(!!error){
			tempCont.release();
			console.log('Error');
		}else{
			let sql = `DELETE FROM student WHERE id= ${req.params.id}`;
			console.log(sql);
			//let sql = `UPDATE users SET Name = ? WHERE UserID = ? id = ${req.params.id}`;
			tempCont.query(sql,function (error, results, fields) {
				tempCont.release();
		        if (!!error){
		        	console.log(error);
		        }else{
		        	con.getConnection(function(error, tempCont){
						if(!!error){
							tempCont.release();
							console.log('Error');
						}else{
							tempCont.query('SELECT * FROM student', function (error, results, fields) {
								tempCont.release();
						        if (!!error){
						        	console.log("Error in query");
						        }else{
						        	res.json(results);
						        }
						    });
						}
					});
		        }
		    });
		}
	});
});

module.exports = router;
