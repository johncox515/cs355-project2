var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    var query = 'SELECT * FROM Brewery';

    console.log(query);

    connection.query(query, function(err, result) {
        if(err) {
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    });
}

exports.GetAllBeers = function(callback) {
    var query = 'SELECT * FROM BeerABV';

    console.log(query);

    connection.query(query, function(err, result) {
        if(err) {
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    });
}

exports.GetByID = function(brewery_id, callback) {
    console.log(brewery_id);
    var query = 'SELECT * FROM Brewery WHERE id=' + brewery_id;
    console.log(query);
    connection.query(query, [brewery_id],
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

exports.Insert = function(brewery_info, callback) {
    var query_data = [brewery_info.name, brewery_info.address_id];
    var query = 'INSERT INTO Brewery (name, street, city, zip, state) VALUES (?, ?, ?, ?);'
    //NOTE: The addresses already exist we only need to save the id to the brewery table

    console.log(query);
    connection.query(query, query_data, function(err, result) {
        if(err){
            console.log(err)
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }
    })
}

exports.Delete = function(brewery_id, callback) {
    var query = 'DELETE FROM Brewery WHERE id = ' + brewery_id;
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