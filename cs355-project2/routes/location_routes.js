var express = require('express');
var router = express.Router();
var locationDal = require('../dal/location_dal');
//var addressDal = require('../dal/location_dal');


/* return a table of all the companies and their addresses */
router.get('/', function(req, res){
    locationDal.GetAll(function(err, result){
        console.log(result);
        res.render('location/location_list', {rs: result});
    });
})


router.get('/create', function(req, res) {
    locationDal.GetAll(function(err, result) {
        res.render('location/location_create', {address : result});
    });
});


/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var location_id = req.query.location_id;
    console.log("location_id: " + location_id);
    locationDal.GetByID(location_id, function(err, location_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving location with id " + location_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('location/location_edit', data);
        }
        else {
            locationDal.GetAllAddress(function(err, address_results) {

                console.log(address_results);
                var data = {
                    Location: location_results,
                    Store: address_results
                };
                console.log("Data is: "+ data);
                res.render('location/location_edit', data);
            })
        }
    });

});

router.get('/save', function(req, res) {
    console.log(req.query);

    locationDal.Insert(req.query, function(err, result) {
        if(err) {
            res.send('Error adding new location.<br />' + err);
        }
        else {
            res.send('location Successfully Added');
        }
    });
})


router.get('/update', function(req, res, next) {


    locationDal.Update(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/delete', function(req, res) {
    console.log(req.query.location_id);

    locationDal.Delete(req.query.location_id, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;

