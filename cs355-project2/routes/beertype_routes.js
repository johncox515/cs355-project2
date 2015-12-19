var express = require('express');
var router = express.Router();
var beertypeDal = require('../dal/beertype_dal');
//var addressDal = require('../dal/location_dal');


/* return a table of all the companies and their addresses */
router.get('/', function(req, res){
    beertypeDal.GetAll(function(err, result){
        console.log(result);
        res.render('beertype/beertype_list', {rs: result});
    });
})


router.get('/create', function(req, res) {
    beertypeDal.GetAll(function(err, result) {
        res.render('beertype/beertype_create', {rs : result});
    });
});

/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var brewery_id = req.query.id;
    console.log("brewery_id: " + brewery_id);
    beertypeDal.GetByID(brewery_id, function(err, brewery_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving brewery with id " + brewery_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('beertype/beertype_edit', data);
        }
        else {
            beertypeDal.GetAll(function(err, address_results) {

                console.log(brewery_results);
                var data = {
                    beertype: brewery_results,
                };
                console.log("Data is: "+ data);
                res.render('beertype/beertype_edit', data);
            })
        }
    });

});

router.get('/save', function(req, res) {
    console.log(req.query);

    beertypeDal.Insert(req.query, function(err, result) {
        if(err) {
            res.send('Error adding new brewery.<br />' + err);
        }
        else {
            res.render('BeerType Successfully Added');
        }
    });
})


router.get('/update', function(req, res, next) {


    beertypeDal.Update(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/delete', function(req, res) {
    console.log(req.query.id);

    beertypeDal.Delete(req.query.id, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;

