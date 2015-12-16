var express = require('express');
var router = express.Router();
var beerDal = require('../dal/beer_dal');
//var addressDal = require('../dal/location_dal');


/* return a table of all the companies and their addresses */
router.get('/', function(req, res){
    beerDal.GetAll(function(err, result){
        console.log(result);
        res.render('beer/beer_list', {rs: result});
    });
})


router.get('/create', function(req, res) {
    beerDal.GetAll(function(err, result) {
        res.render('beer/beer_create', {address : result});
    });
});


/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var beer_id = req.query.beer_id;
    console.log("beer_id: " + beer_id);
    beerDal.GetByID(beer_id, function(err, beer_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving beer with id " + beer_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('beer/beer_edit', data);
        }
        else {
            beerDal.GetAll(function(err, address_results) {

                console.log(beer_results);
                var data = {
                    beer: beer_results,
                    ABV: address_results
                };
                console.log("Data is: "+ data);
                res.render('beer/beer_edit', data);
            })
        }
    });

});

router.get('/save', function(req, res) {
    console.log(req.query);

    beerDal.Insert(req.query, function(err, result) {
        if(err) {
            res.send('Error adding new beer.<br />' + err);
        }
        else {
            res.send('beer Successfully Added');
        }
    });
})


router.get('/update', function(req, res, next) {
    console.log("beer name equals: " + req.query.name);
    console.log("the beer street submitted was: " + req.query.street);
    console.log("the beer city submitted was: " + req.query.city);
    console.log("the beer zip submitted was: " + req.query.zip);
    console.log("the beer_id submitted was " + req.query.beer_id);



    beerDal.Update(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/delete', function(req, res) {
    console.log(req.query.beer_id);

    beerDal.Delete(req.query.beer_id, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;

