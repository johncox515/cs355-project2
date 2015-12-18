var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.GetByEmail = function(email, callback) {
    var query = 'CALL Account_GetByEmail(?)';
    var query_data = [email];
    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
/*NOTE: Stored Procedure results are wrapped in an extra array
 and only one user record should be returned,
 so return only the one result*/
         else if(result[0].length == 1) {
         callback(err, result[0][0]);
         }
         else {
         callback(err, null);
         }
    });
}

exports.Insert = function(account_info, callback) {

    console.log(account_info);

    var dynamic_query = 'INSERT INTO UserAccount (Fname, Lname, EMail, password) VALUES (' +
        '\'' + account_info.firstname + '\', ' +
        '\'' + account_info.lastname + '\', ' +
        '\'' + account_info.email + '\', ' +
        '\'' + account_info.password + '\'' +
        ');';

    console.log(dynamic_query);


    connection.query(dynamic_query,

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