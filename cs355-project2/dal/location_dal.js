var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    var query = 'select s.id AS Id, sl.id AS slid, s.name AS StoreName, sl.address AS Address from Store s JOIN StoreLocations sl ON sl.StoreID = s.id';

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

exports.GetAllAddress = function(callback) {
    var query = 'select * from Store';

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


exports.GetByID = function(location_id, callback) {
    console.log(location_id);
    var query = 'SELECT * FROM Store WHERE id=' + location_id;
    console.log(query);
    connection.query(query, [location_id],
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

exports.Insert = function(location_info, callback) {
    var query_data = [location_info.Address, location_info.storename];
    var query = 'INSERT INTO StoreLocations (address, StoreID) VALUES (?, ?);'
    //NOTE: The addresses already exist we only need to save the id to the location table

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

exports.Delete = function(location_id, callback) {
    var query = 'DELETE FROM StoreLocations WHERE id = ' + location_id;
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

exports.Update = function(company_info, callback) {
    var query_data = [company_info.Address, company_info.storename, company_info.location_id];
    var query = 'UPDATE StoreLocations SET address = ?,  StoreID = ? WHERE id = ?';
    connection.query(query, query_data, function(err, result) {
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