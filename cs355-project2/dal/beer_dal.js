var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT b.id AS BeerID, b.name AS bname, b.abv AS ABV, bt.name AS btypename, bt.id AS BeerTypeID FROM Beer b JOIN Beer_BeerType bbt ON b.id = bbt.BeerID JOIN BeerType bt ON bt.id = bbt.BeerTypeID;',
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
    var query = 'SELECT * FROM Beer WHERE id=' + beer_id;
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

    var dynamic_query = 'INSERT INTO Beer (name, ABV, BrewID) VALUES (' +
        '\'' + beer_info.beername + '\', ' +
        '\'' + beer_info.abv + '\', ' +
        '\'' + beer_info.breweryid + '\'' +
        ');';
/*        ' INSERT INTO Beer_BeerType (BeerID, BeerTypeID) VALUES (' +
            '\'' + beer_info.beerid + '\', ' +
            '\'' + beer_info.btypeid + '\'' +
        ');'
        ;
*/
/*    var dynamic_query2 = 'INSERT INTO Beer_BeerType (BeerID, BeerTypeID) VALUES (' +
            '\'' + beer_info.beerid + '\', ' +
            '\'' + beer_info.btypeid + '\'' +
            ');'
*/        ;
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
/*
    connection.query(dynamic_query2,
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
*/
}

exports.Delete = function(id, callback) {
    var query = 'DELETE FROM Beer WHERE id=' + id;
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
    var query_data = [beer_info.beername, beer_info.brewery_id, beer_info.beer_id];
    var query = 'UPDATE Beer SET name = ?, BrewID = ? WHERE id = ?';
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

