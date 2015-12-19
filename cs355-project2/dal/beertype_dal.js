var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM BeerType',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}


exports.GetByID = function(beer_id, callback) {
    console.log(beer_id);
    var query = 'SELECT * FROM BeerType WHERE id=' + beer_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(beer_info, callback) {

    console.log(beer_info);

    var dynamic_query = 'INSERT INTO BeerType (name) VALUES (' +
            '\'' + beer_info.beertypename + '\'' +
            ');';

    console.log("test");
    console.log(dynamic_query);

    // connection.query(query, is where the SQL string we built above is actually sent to the MySQL server to be run
    connection.query(dynamic_query,
        function (err, result) {

            // if the err parameter isn't null or 0, then it will run the code within the if statement
            if(err) {

                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Delete = function(id, callback) {
    var query = 'DELETE FROM BeerType WHERE id=' + id;
    connection.query(query, function(err, result){
        if(err){
            console.log(err)
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }

    });
}
exports.Update = function(beer_info, callback) {
    var query_data = [beer_info.beertypename, beer_info.beertype_id];
    var query = 'UPDATE BeerType SET name = ? WHERE id = ?';
    connection.query(query, query_data, function(err, result) {
        if(err){
            console.log(query_data);
            console.log(query);
            console.log(err)
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }
    });
}

